import Problem from "./src/pages/Problem";
import Result from "./src/pages/Result";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";

const MyTabs = createBottomTabNavigator({
  screens: {
    Problem: Problem,
    Result: Result,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}
