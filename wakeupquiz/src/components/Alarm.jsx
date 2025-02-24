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

export async function sendNotification(hour, minute) {
  console.log("timeGetter実行:", hour, minute);

  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hour, minute, 0, 0);

  // 過去の時間なら翌日にセット
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  // 現在時刻との差分を秒で計算
  const delayInSeconds = Math.round(
    (scheduledTime.getTime() - now.getTime()) / 1000
  );

  console.log(
    `通知予定時間: ${scheduledTime.toLocaleString()} (あと ${delayInSeconds} 秒)`
  );

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "お知らせ",
      body: "設定した時間になりました！",
      sound: "default",
      badge: 1,
    },
    trigger: {
      seconds: delayInSeconds,
    },
  });

  console.log("通知が正常にスケジュールされました！");
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
