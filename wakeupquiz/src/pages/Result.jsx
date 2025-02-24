import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import { AlarmContext } from "../hooks/useAlarm";
import { useNotification } from "../hooks/useNotification";
import { QUIZ_LIST } from "../Constants";

const Result = ({ score }) => {
  const { isAlarmOn, toggleAlarm } = useContext(AlarmContext);
  const { cancelAllNotifications } = useNotification();

  const totalScore = QUIZ_LIST.length

  // アラームを停止
  const stopAlarm = async () => {
    await cancelAllNotifications();
    toggleAlarm(false);
    alert("アラームが解除されました！");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>あなたのスコア: {score} / {totalScore} 点</Text>

      {isAlarmOn && (
        <Button title="アラームを止める" onPress={stopAlarm} />
      )}
    </View>
  );
};

export default Result;
