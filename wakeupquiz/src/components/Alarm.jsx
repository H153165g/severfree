import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// 通知の権限をリクエスト
async function requestPermissions() {
  console.log("通知の権限をリクエスト中...");
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    console.log("通知の権限がありません");
    return false; // 権限が許可されていない場合、falseを返す
  }
  console.log("通知の権限が許可されました");
  return true;
}

// 通知のリスナーをセットアップ（コンポーネント内で使用）
export function useNotificationListener() {
  useEffect(() => {
    // 権限をリクエスト
    requestPermissions();

    // 通知を受信したときのリスナーを追加
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("通知を受信:", notification);
      }
    );

    // クリーンアップ
    return () => {
      subscription.remove();
    };
  }, []);
}

// 通知を送信する関数
export async function sendNotification(hours, minutes, seconds) {
  console.log("通知を送信します...");

  const permissionsGranted = await requestPermissions();
  if (!permissionsGranted) {
    console.log("通知の権限がないため、通知を送信できません");
    return;
  }

  // 通知をスケジュールする際にトリガーを指定
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "お知らせ",
      body: "これはテスト通知です",
      badge: 1,
    },
    trigger: {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    },
  });
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});
