import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Problem = () => {

  const navigation = useNavigation();
  
  return (
    <View>
      <Text>Problem</Text>
      <Button
        title="Go to Result"
        onPress={() => {
          navigation.navigate('Result');
        }}
      />
    </View>
  )
}

export default Problem