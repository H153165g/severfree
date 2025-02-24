import { useNavigation } from "@react-navigation/native";
import { View, Button } from "react-native";
import { timeGetter } from "../components/Time";

const Home = () => {
  const navigation = useNavigation();
  const handleSendNotification = () => {
    timeGetter(22, 21); // 通知を送る
  };

  return (
    <View>
      <Button
        title="Go to Problem"
        onPress={() => {
          navigation.navigate("Problem");
        }}
      />
      <Button
        title="Send Notification"
        onPress={handleSendNotification} // 通知を送る関数をボタンに結びつけ
      />
    </View>
  );
};

export default Home;
