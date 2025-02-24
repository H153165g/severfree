import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { navigationRef } from "../components/navigationRef";

export const useNotification = () => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 通知の権限をリクエスト
    async function registerForPushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          alert("通知の許可が必要です");
          return;
        }
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
        navigationRef.current?.navigate("Problem");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // 通知をスケジュールする関数
  const scheduleNotification = async (seconds = 10) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "クイズアラーム",
        body: "クイズを解いてアラームを解除してください！",
        data: { screen: "Problem" },
      },
      trigger: { seconds }, // 指定秒後に通知
    });
  };

  // すべての通知をキャンセルする関数
  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return { scheduleNotification, cancelAllNotifications };
};
