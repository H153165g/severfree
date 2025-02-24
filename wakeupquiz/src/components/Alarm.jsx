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
export async function sendNotification(hours, minutes, seconds) {
  console.log("通知をスケジュールします...");

  const permissionsGranted = await requestPermissions();
  if (!permissionsGranted) {
    console.log("通知の権限がないため、通知を送信できません");
    return;
  }

  // 現在の時刻を取得
  const now = new Date();
  const scheduledTime = new Date();

  // 指定した時間を設定（秒とミリ秒は0にする）
  scheduledTime.setHours(hours, minutes, seconds, 0);

  // 過去の時間なら翌日にセット
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  console.log(`通知予定時間: ${scheduledTime.toLocaleString()}`);
  const delayInSeconds = Math.round(
    (scheduledTime.getTime() - now.getTime()) / 1000
  );

  // 通知をスケジュール
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "お知らせ",
      body: "これはテスト通知です",
      sound: "../../assets/BGM_1.mp3",
      badge: 1,
    },
    trigger: {
      date: delayInSeconds, // 修正ポイント: `date` を使う
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
