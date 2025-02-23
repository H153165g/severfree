import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { sendNotification } from "../components/Alarm";
import { timeGetter } from "../components/Time";
const Problem = () => {
  const navigation = useNavigation();
  const handleSendNotification = () => {
    timeGetter(22, 21); // 通知を送る
  };
  return (
    <View>
      <Text>Problem</Text>
      <Button
        title="Send Notification"
        onPress={handleSendNotification} // 通知を送る関数をボタンに結びつけ
      />
      <Button
        title="Go to Result"
        onPress={() => {
          navigation.navigate("Result");
        }}
      />
    </View>
  );
};

export default Problem;
