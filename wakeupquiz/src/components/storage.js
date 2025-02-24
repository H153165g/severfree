import AsyncStorage from "@react-native-async-storage/async-storage";

const ALARM_STATUS_KEY = "alarmStatus";

// アラーム状態を保存
export const setAlarmStatus = async (status) => {
  try {
    await AsyncStorage.setItem(ALARM_STATUS_KEY, JSON.stringify(status));
  } catch (error) {
    console.error("アラーム状態の保存に失敗:", error);
  }
};

// アラーム状態を取得
export const getAlarmStatus = async () => {
  try {
    const status = await AsyncStorage.getItem(ALARM_STATUS_KEY);
    return status ? JSON.parse(status) : false; // デフォルトは OFF
  } catch (error) {
    console.error("アラーム状態の取得に失敗:", error);
    return false;
  }
};
