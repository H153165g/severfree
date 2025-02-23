import { Text, View, Button } from 'react-native'

const Result = ({ navigation }) => {
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