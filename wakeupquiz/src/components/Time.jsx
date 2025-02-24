import { sendNotification } from "./Alarm";
// 通知を1時間にわたって送る関数
export const timeGetter = async (hours, minutes) => {
  let seconds = 0;
  // 1時間(3600秒)にわたって通知を送信
  for (let i = 0; i < 3600; i++) {
    // 秒を1増やす
    seconds += 1;

    // 秒が60になったら、分を1増やす
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;

      // 分が60になったら、時間を1増やす
      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
      }
    }

    // 通知を送信
    await sendNotification(hours, minutes, seconds);

    // 1秒待機（次の通知まで待つ）
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms = 1秒
  }
};
