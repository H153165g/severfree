import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { timeGetter } from "../components/Time";
import SettingsSheet from "./SettingsSheet";
const Home = () => {
  const [settings, setSettings] = useState({
    time: "07:00",
    genre: "基本情報",
    problems: 1,
    music: "音楽1",
  });
  const [showSheet, setShowSheet] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false);

  const navigation = useNavigation();

  const handleOpenSheet = () => {
    setShowSheet(true);
  };

  const handleCloseSheet = () => {
    setShowSheet(false);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSheet(false);
  };

  const handleToggleAlarm = () => {
    setAlarmOn((prev) => !prev);
  };

  // 設定された時間(settings.time)を分解し、timeGetterに渡す
  const handleSendNotification = () => {
    const [hourStr, minuteStr] = settings.time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    timeGetter(hour, minute);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>アラーム時刻: {settings.time}</Text>
        <Text style={styles.infoText}>問題ジャンル: {settings.genre}</Text>
        <Text style={styles.infoText}>問題数: {settings.problems}</Text>
        <Text style={styles.infoText}>アラーム音: {settings.music}</Text>
        <Text style={styles.infoText}>
          アラーム状態: {alarmOn ? "ON" : "OFF"}
        </Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleOpenSheet}>
        <Text style={styles.editButtonText}>Edit Alarm</Text>
      </TouchableOpacity>

      <SettingsSheet
        visible={showSheet}
        onClose={handleCloseSheet}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />

      <TouchableOpacity style={styles.alarmButton} onPress={handleToggleAlarm}>
        <Text style={styles.alarmButtonText}>
          {alarmOn ? "アラーム停止" : "アラーム開始"}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Problem"
          onPress={() => {
            navigation.navigate("Problem");
          }}
        />
        <Button title="Send Notification" onPress={handleSendNotification} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f1e4", // 優しいパーチメント調の背景色
    paddingTop: 60,
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "#fefbf3",
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    width: "90%",
    borderWidth: 1,
    borderColor: "#c9a66b",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  infoText: {
    fontSize: 18,
    color: "#5c4033",
    marginBottom: 8,
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: "#b98d62",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 100, // 下部ボタンとの間隔
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  alarmButton: {
    position: "absolute",
    bottom: 150,
    backgroundColor: "#8b4513",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  alarmButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
});

export default Home;
