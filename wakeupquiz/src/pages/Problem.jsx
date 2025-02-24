import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WORD_LIST } from "../Constants";
import { generateQuiz } from "../hooks/generateQuiz";

// 配列のシャッフル用ヘルパー関数
const shuffleArray = (array) => {
  let newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const Problem = ({ score, setScore }) => {
  const navigation = useNavigation();
  const [quizList, setQuizList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 問題生成
  useEffect(() => {
    const generateQuizzes = async () => {
      // WORD_LISTから重複しないランダムな3単語を選ぶ
      let words = shuffleArray(WORD_LIST);
      const selectedWords = words.slice(0, 3);
      
      const quizzes = [];
      for (const word of selectedWords) {
        try {
          // generateQuiz関数は、引数の単語をもとに{ question, explanation }を返す
          const quizData = await generateQuiz(word);
          // 正解は word で、その他の選択肢としてWORD_LISTから word を除いた中から3単語をランダムに選ぶ
          let otherWords = WORD_LIST.filter(w => w !== word);
          otherWords = shuffleArray(otherWords).slice(0, 3);
          // 正解とその他を混ぜて4択にする
          const optionsArray = shuffleArray([word, ...otherWords]);
          // 各選択肢にA～Dのラベルを付与する
          const optionLabels = ["A", "B", "C", "D"];
          const options = {};
          let correctOptionLetter = "";
          optionsArray.forEach((opt, index) => {
            const label = optionLabels[index];
            options[`option${label}`] = opt;
            if (opt === word) {
              correctOptionLetter = label;
            }
          });
          quizzes.push({
            question: quizData.question,
            explanation: quizData.explanation,
            options,
            answer: correctOptionLetter,
          });
        } catch (error) {
          console.error("Error generating quiz for word:", word, error);
        }
      }
      setQuizList(quizzes);
    };

    generateQuizzes();
  }, []);

  // 解答処理
  const handleAnswer = (selectedOption) => {
    const correct = selectedOption === quizList[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  // 次の問題へ
  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestion < quizList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("Result", { total: quizList.length, correct: score });
    }
  };

  if (quizList.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
        <Text>クイズを生成中...</Text>
      </View>
    );
  }

  const currentQuiz = quizList[currentQuestion];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        {currentQuestion + 1} / 3 問
      </Text>
      {!showFeedback ? (
        <>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {currentQuiz.question}
          </Text>
          {["A", "B", "C", "D"].map(letter => (
            <TouchableOpacity
              key={letter}
              onPress={() => handleAnswer(letter)}
              style={{ padding: 10, marginBottom: 5, backgroundColor: '#ddd' }}
            >
              <Text>{currentQuiz.options[`option${letter}`]}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>
            {isCorrect ? "正解！" : "不正解…"}
          </Text>
          {!isCorrect && (
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              ✅ 正解: {currentQuiz.options[`option${currentQuiz.answer}`]}
            </Text>
          )}
          <Text style={{ marginBottom: 10 }}>{currentQuiz.explanation}</Text>
          <TouchableOpacity onPress={handleNextQuestion} style={{ padding: 10, backgroundColor: '#ddd' }}>
            <Text>次の問題へ</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Problem;
