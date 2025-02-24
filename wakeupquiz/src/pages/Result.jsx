import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AlarmContext } from "../hooks/useAlarm";
import { useNotification } from "../hooks/useNotification";
import { useNavigation } from "@react-navigation/native";

const Result = ({ score, setScore }) => {
  const navigation = useNavigation();
  const { isAlarmOn, toggleAlarm } = useContext(AlarmContext);
  const { cancelAllNotifications } = useNotification();

  const totalScore = 3;

  // アラームを停止する処理
  const stopAlarm = async () => {
    await cancelAllNotifications();
    toggleAlarm(false);
    alert("アラームが解除されました！");
  };

  // ホーム画面へ戻る処理
  const backToHome = () => {
    navigation.popToTop();
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.scoreText}>あなたのスコア: {score} / {totalScore} 点</Text>
      </View>
      {isAlarmOn ? (
        <TouchableOpacity style={styles.button} onPress={stopAlarm}>
          <Text style={styles.buttonText}>アラームを止める</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={backToHome}>
          <Text style={styles.buttonText}>アラーム設定画面に戻る</Text>
        </TouchableOpacity>
      )}
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
  resultCard: {
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
    marginBottom: 30,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 24,
    color: "#5c4033",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#8b4513",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Result;
