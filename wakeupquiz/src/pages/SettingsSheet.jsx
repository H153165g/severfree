import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const SettingsSheet = ({ visible, onClose, onSave, currentSettings }) => {
  // "HH:mm"文字列をDateオブジェクトに変換
  const parseTimeString = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  // 各セレクト用のオプション
  const genreOptions = ["基本情報", "応用情報"];
  const problemsOptions = [1, 2, 3, 4];
  const musicOptions = ["音楽1", "音楽2", "音楽3"];

  // stateの初期化
  const [alarmTime, setAlarmTime] = useState(
    parseTimeString(currentSettings.time)
  );
  const [genre, setGenre] = useState(currentSettings.genre || "Math");
  const [problems, setProblems] = useState(
    currentSettings.problems !== undefined ? currentSettings.problems : 1
  );
  const [music, setMusic] = useState(currentSettings.music || "Classical");

  // モーダル表示時にstateをリセット
  useEffect(() => {
    if (visible) {
      setAlarmTime(parseTimeString(currentSettings.time));
      setGenre(currentSettings.genre || "Math");
      setProblems(
        currentSettings.problems !== undefined ? currentSettings.problems : 10
      );
      setMusic(currentSettings.music || "Classical");
    }
  }, [visible, currentSettings]);

  // Dateオブジェクトを"HH:mm"形式に変換
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hh = hours < 10 ? `0${hours}` : hours;
    const mm = minutes < 10 ? `0${minutes}` : minutes;
    return `${hh}:${mm}`;
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      time: formatTime(alarmTime),
      genre,
      problems,
      music,
    });
    onClose();
  };

  const handlePressGenre = () => {
    const currentIndex = genreOptions.indexOf(genre);
    const nextIndex = (currentIndex + 1) % genreOptions.length;
    setGenre(genreOptions[nextIndex]);
  };

  const handlePressProblems = () => {
    const currentIndex = problemsOptions.indexOf(problems);
    const nextIndex = (currentIndex + 1) % problemsOptions.length;
    setProblems(problemsOptions[nextIndex]);
  };

  const handlePressMusic = () => {
    const currentIndex = musicOptions.indexOf(music);
    const nextIndex = (currentIndex + 1) % musicOptions.length;
    setMusic(musicOptions[nextIndex]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.navBarButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.navBarButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timePickerContainer}>
            <DateTimePicker
              value={alarmTime}
              mode="time"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setAlarmTime(selectedDate);
                }
              }}
              textColor="#4B3621"
            />
          </View>

          {/* セレクトボタン式の各設定項目 */}
          <View style={styles.tableContainer}>
            <TouchableOpacity
              style={styles.tableRow}
              onPress={handlePressGenre}
            >
              <Text style={styles.tableRowLabel}>Study Genre</Text>
              <Text style={styles.tableRowValue}>{genre}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tableRow}
              onPress={handlePressProblems}
            >
              <Text style={styles.tableRowLabel}>Number of Problems</Text>
              <Text style={styles.tableRowValue}>{problems}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tableRow}
              onPress={handlePressMusic}
            >
              <Text style={styles.tableRowLabel}>Music</Text>
              <Text style={styles.tableRowValue}>{music}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 70,
    borderWidth: 1,
    borderColor: "#8B4513",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navBarTitle: {
    color: "#F5DEB3",
    fontSize: 18,
    fontWeight: "700",
  },
  navBarButtonText: {
    color: "#DAA520",
    fontSize: 16,
  },
  timePickerContainer: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  tableContainer: {
    backgroundColor: "#f8f8ff",
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#8B4513",
  },
  tableRowLabel: {
    color: "#4B3621",
    fontSize: 16,
  },
  tableRowValue: {
    color: "#4B3621",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SettingsSheet;
