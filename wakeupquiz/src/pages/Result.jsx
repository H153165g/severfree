import { Text, View, Button } from "react-native";
import { sendNotification } from "../feature/Alarm"; // 関数のインポート

const Result = ({ navigation }) => {
  // 通知を送る関数をボタンの中で呼び出す
  const handleSendNotification = () => {
    sendNotification(); // 通知を送る
  };

  return (
    <View>
      <Text>Result</Text>

      <Button
        title="Send Notification"
        onPress={handleSendNotification} // 通知を送る関数をボタンに結びつけ
      />

      <Button
        title="Go to Problem"
        onPress={() => {
          navigation.navigate("Problem");
        }}
      />
    </View>
  );
};

export default Result;
