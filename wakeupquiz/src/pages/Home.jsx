import { useNavigation } from "@react-navigation/native";
import { View, Button } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Go to Result"
        onPress={() => {
          navigation.navigate("Result");
        }}
      />
    </View>
  );
};

export default Home;
