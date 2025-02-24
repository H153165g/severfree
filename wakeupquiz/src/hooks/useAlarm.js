import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALARM_STATUS_KEY } from "../Constants";

// アラームの状態を管理する Context
export const AlarmContext = createContext();

export const useAlarm = () => {
  const [isAlarmOn, setIsAlarmOn] = useState(false);

  // アプリ起動時にアラーム状態を取得
  useEffect(() => {
    async function loadAlarmStatus() {
      const status = await AsyncStorage.getItem(ALARM_STATUS_KEY);
      // setIsAlarmOn(status ? JSON.parse(status) : false);
      setIsAlarmOn(true); //開発ではtrueにしておく
    }
    loadAlarmStatus();
  }, []);

  // アラーム状態の変更を保存
  const toggleAlarm = async (status) => {
    setIsAlarmOn(status);
    await AsyncStorage.setItem(ALARM_STATUS_KEY, JSON.stringify(status));
  };

  return { isAlarmOn, toggleAlarm };
};
