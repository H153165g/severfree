import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { QUIZ_LIST } from "../Constants";

const Problem = ({ score, setScore }) => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = QUIZ_LIST.length;
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 解答処理
  const handleAnswer = (selectedOption) => {
    const correct = selectedOption === QUIZ_LIST[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  // 次の問題へ
  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // スコアを渡して `Result` 画面へ遷移
      navigation.navigate("Result", { total: totalQuestions, correct: score });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        残りの問題数: {totalQuestions - currentQuestion}
      </Text>
      {!showFeedback ? (
        <>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {QUIZ_LIST[currentQuestion].question}
          </Text>
          <TouchableOpacity onPress={() => handleAnswer("A")} style={{ padding: 10, marginBottom: 5, backgroundColor: '#ddd' }}>
            <Text>{QUIZ_LIST[currentQuestion].optionA}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAnswer("B")} style={{ padding: 10, marginBottom: 5, backgroundColor: '#ddd' }}>
            <Text>{QUIZ_LIST[currentQuestion].optionB}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAnswer("C")} style={{ padding: 10, marginBottom: 5, backgroundColor: '#ddd' }}>
            <Text>{QUIZ_LIST[currentQuestion].optionC}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAnswer("D")} style={{ padding: 10, marginBottom: 5, backgroundColor: '#ddd' }}>
            <Text>{QUIZ_LIST[currentQuestion].optionD}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>
            {isCorrect ? "正解！" : "不正解…"}
          </Text>
          <TouchableOpacity onPress={handleNextQuestion} style={{ padding: 10, backgroundColor: '#ddd' }}>
            <Text>次の問題へ</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Problem;
