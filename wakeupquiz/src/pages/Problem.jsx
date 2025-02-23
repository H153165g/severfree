import { Text, View, Button } from 'react-native'

const Problem = ({ navigation }) => {
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