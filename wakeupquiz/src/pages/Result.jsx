import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Result = () => {

  const navigation = useNavigation();

  return (
    <View>
      <Text>Result</Text>
      <Button
        title="Go to Problem"
        onPress={() => {
          navigation.navigate('Problem');
        }}
      />
    </View>
  )
}

export default Result