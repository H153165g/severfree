import Problem from "./src/pages/Problem";
import Result from "./src/pages/Result";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Problem"
          component={Problem}
          options={{
            title: "問題",
            tabBarIcon: ({ color, size }) => (
              <Feather name="book-open" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Result"
          component={Result}
          options={{
            title: "成績",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="results" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
