import { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Problem from "./src/pages/Problem";
import Result from "./src/pages/Result";
import Home from "./src/pages/Home";
import { navigationRef } from "./src/components/navigationRef";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    // 通知の権限をリクエスト
    async function registerForPushNotifications() {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("通知の許可が必要です");
        return;
      }
    }
    registerForPushNotifications();

    // 通知が届いた時のリスナー
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("通知を受信しました:", notification);
      });

    // 通知をタップした時の処理（Problem画面へ遷移）
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("通知をタップしました:", response);
        navigationRef.current?.navigate("Problem"); // 問題画面へ遷移
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Problem" component={Problem} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
