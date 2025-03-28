import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Problem from "./src/pages/Problem";
import Result from "./src/pages/Result";
import Home from "./src/pages/Home";
import { navigationRef } from "./src/components/navigationRef";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AlarmContext, useAlarm } from "./src/hooks/useAlarm";
import { useNotification } from "./src/hooks/useNotification";

const Stack = createNativeStackNavigator();

export default function App() {
  const [score, setScore] = useState(0);
  const { isAlarmOn, toggleAlarm } = useAlarm();
  useNotification();

  return (
    <AlarmContext.Provider value={{ isAlarmOn, toggleAlarm }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerBackVisible: false }}>
          <Stack.Screen name="Quiz alarm" component={Home} />
          <Stack.Screen name="Problem">
            {() => (
              <Problem
                score={score}
                setScore={setScore}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Result">
            {() => (
              <Result
                score={score}
                setScore={setScore}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AlarmContext.Provider>
  );
}
