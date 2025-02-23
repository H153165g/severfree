import React from "react";
import { View, Button } from "react-native";
import PushNotification from "react-native-push-notification";

export default function sendNotification() {
  PushNotification.localNotificationSchedule({
    title: "アラーム",
    message: "アラームの時間ですよ〜！",
    date: new Date(Date.now() + 5 * 1000), // 5秒後に通知
    allowWhileIdle: true,
    soundName: "alarm_sound.mp3", // カスタムサウンド
    repeatType: "day", // 毎日リピートnn
  });
}
