import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// 通知の権限をリクエスト
async function requestPermissions() {
  console.log("通知の権限をリクエスト中...");

  let { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    console.log("通知の権限がないため、リクエストを送信...");
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    status = newStatus; // 更新
  }

  if (status !== "granted") {
    console.log("通知の権限が拒否されました");
    return false;
  }

  console.log("通知の権限が許可されました");
  return true;
}

// 🔹 通知のリスナーをセットアップ（コンポーネント内で使用）
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

// 🔹 通知を送信する関数
export async function sendNotification() {
  console.log("通知を送信します...");

  const permissionsGranted = await requestPermissions();
  if (!permissionsGranted) {
    console.log("通知の権限がないため、通知を送信できません");
    return;
  }

  // カスタム音を設定して通知をスケジュール
  const notification = await Notifications.scheduleNotificationAsync({
    content: {
      title: "お知らせ",
      body: "これはテスト通知です",
      // sound: "asset:/sounds/notification_sound.mp3", // ここで音を設定
    },
    trigger: { seconds: 5 }, // 5秒後に通知
  });

  console.log("通知をスケジュールしました", notification);
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
