import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
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

  // 問題生成：WORD_LISTからランダムに3単語選び、各単語でgenerateQuiz関数を呼び出す
  useEffect(() => {
    const generateQuizzes = async () => {
      let words = shuffleArray(WORD_LIST);
      const selectedWords = words.slice(0, 3);
      
      const quizzes = [];
      for (const word of selectedWords) {
        try {
          // generateQuizは{ question, explanation }を返す
          const quizData = await generateQuiz(word);
          // 正解はword、その他はWORD_LISTから除外した中から3単語選ぶ
          let otherWords = WORD_LIST.filter(w => w !== word);
          otherWords = shuffleArray(otherWords).slice(0, 3);
          // 正解とその他を混ぜて4択の選択肢を生成
          const optionsArray = shuffleArray([word, ...otherWords]);
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

  // 次の問題へ進む、もしくは結果画面へ遷移
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8b4513" />
        <Text style={styles.loadingText}>クイズを生成中...</Text>
      </View>
    );
  }

  const currentQuiz = quizList[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>{currentQuestion + 1} / 3 問</Text>
      </View>
      <View style={styles.quizCard}>
        {!showFeedback ? (
          <>
            <Text style={styles.questionText}>{currentQuiz.question}</Text>
            {["A", "B", "C", "D"].map(letter => (
              <TouchableOpacity
                key={letter}
                onPress={() => handleAnswer(letter)}
                style={styles.optionButton}
              >
                <Text style={styles.optionText}>{currentQuiz.options[`option${letter}`]}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <Text style={styles.feedbackText}>
              {isCorrect ? "正解！" : "不正解…"}
            </Text>
            {!isCorrect && (
              <Text style={styles.correctText}>
                ✅ 正解: {currentQuiz.options[`option${currentQuiz.answer}`]}
              </Text>
            )}
            <Text style={styles.explanationText}>{currentQuiz.explanation}</Text>
            <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>
                {currentQuestion === quizList.length - 1 ? "結果を見る" : "次の問題へ"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f1e4", // 優しいパーチメント調の背景色
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: "#fefbf3",
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#c9a66b",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#5c4033",
    fontWeight: "500",
  },
  quizCard: {
    backgroundColor: "#fefbf3",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#c9a66b",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#5c4033",
  },
  optionButton: {
    backgroundColor: "#b98d62",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  feedbackText: {
    fontSize: 24,
    marginBottom: 10,
    color: "#5c4033",
    textAlign: "center",
  },
  correctText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#8b4513",
    textAlign: "center",
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#5c4033",
  },
  nextButton: {
    backgroundColor: "#8b4513",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
    color: "#5c4033",
  },
});

export default Problem;
