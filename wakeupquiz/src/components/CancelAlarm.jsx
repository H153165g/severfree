import * as Notifications from "expo-notifications";
export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log("すべてのスケジュールされた通知をキャンセルしました");
}
