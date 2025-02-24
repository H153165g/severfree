import Constants from 'expo-constants';

// manifestが存在しない場合はexpoConfigから取得
const extra = Constants.expoConfig?.extra;
const OPENAI_API_KEY = extra?.OPENAI_API_KEY;

async function generateQuiz(answerWord) {
  // ChatGPTに送るプロンプト。システムメッセージでクイズ生成の役割を与え、ユーザーからのリクエストで出力をJSON形式にするよう依頼します。
  const messages = [
    {
      role: "system",
      content:
        "あなたはクイズ作成のエキスパートです。ユーザーから与えられた単語を回答とする、一問一答形式のクイズを生成してください。質問文はシンプルに問題のみを記述し、解説文もその問題に対する答えの根拠のみを示してください。選択肢や余計な記述は一切含めず、出力は純粋な質問文と解説文のみとしてください。必ずJSON形式で出力し、キーは 'question' と 'explanation' としてください。"
    },
    {
      role: "user",
      content: `回答が"${answerWord}"となるクイズを作成してください。`
    }
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7
      })
    });

    const data = await response.json();

    // ChatGPTの返答からメッセージ部分を抽出
    const messageContent = data.choices[0].message.content;

    let cleanMessage = messageContent.trim();

    // コードブロックの記述がある場合は削除する
    if (cleanMessage.startsWith("```")) {
      // 1行目（```json）を削除
      cleanMessage = cleanMessage.split("\n").slice(1).join("\n");
      // 最終行の ``` を削除
      cleanMessage = cleanMessage.replace(/```$/, "").trim();
    }
    const result = JSON.parse(cleanMessage);
    return result; // { question: "...", explanation: "..." }
  } catch (error) {
    console.error("Quiz generation error:", error);
    throw error;
  }
}

// エクスポートして他のファイルから利用できるようにします
module.exports = { generateQuiz };