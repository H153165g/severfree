import { sendNotification } from "./Alarm";

// キャンセルフラグ（モジュール内の状態）
let alarmCanceled = false;

// アラーム停止時に呼び出してループを中断するための関数
export const cancelTimeGetter = () => {
  alarmCanceled = true;
};

// 指定した時刻から1時間にわたって毎秒通知を送る関数
export const timeGetter = async (hours, minutes) => {
  // アラーム開始時にキャンセルフラグをリセット
  alarmCanceled = false;
  let seconds = 0;

  // 1時間＝3600秒分ループ
  for (let i = 0; i < 3600; i++) {
    // キャンセルフラグが立っていればループを抜ける
    if (alarmCanceled) {
      console.log("アラームが停止されたため、timeGetterループを終了します。");
      break;
    }

    // 秒を1増やす
    seconds += 1;
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
        if (hours >= 24) hours = 0;
      }
    }

    // 通知を送信
    await sendNotification(hours, minutes, seconds);

    // 次の通知まで1秒待機
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};
