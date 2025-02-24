import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import { AlarmContext } from "../hooks/useAlarm";
import { useNotification } from "../hooks/useNotification";
import { useNavigation } from "@react-navigation/native";
// timeGetter のキャンセル関数をインポート
import { cancelTimeGetter } from "../components/Time";

const Result = ({ score, setScore }) => {
  const navigation = useNavigation();
  const { isAlarmOn, toggleAlarm } = useContext(AlarmContext);
  const { cancelAllNotifications } = useNotification();

  const totalScore = 3;

  // アラームを停止する関数
  const stopAlarm = async () => {
    await cancelAllNotifications();
    toggleAlarm(false);
    // timeGetter のループを中断する
    cancelTimeGetter();
    alert("アラームが解除されました！");
  };

  const backToHome = () => {
    navigation.popToTop();
    setScore(0);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>
        あなたのスコア: {score} / {totalScore} 点
      </Text>

      {isAlarmOn && <Button title="アラームを止める" onPress={stopAlarm} />}

      {!isAlarmOn && (
        <Button title="アラーム設定画面に戻る" onPress={backToHome} />
      )}
    </View>
  );
};

export default Result;
