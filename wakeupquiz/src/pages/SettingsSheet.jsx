import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const SettingsSheet = ({ visible, onClose, onSave, currentSettings }) => {
  // Convert "HH:mm" string to a Date object
  const parseTimeString = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  // Preset options arrays for selection
  const repeatOptions = ["Never", "Every Day", "Weekdays", "Weekends"];
  const labelOptions = ["Alarm", "Morning Alarm", "Workout Alarm"];
  const soundOptions = ["Radial", "Chime", "Alarm"];

  // State initialization from currentSettings
  const [alarmTime, setAlarmTime] = useState(
    parseTimeString(currentSettings.time)
  );
  const [repeat, setRepeat] = useState(currentSettings.repeat || "Never");
  const [label, setLabel] = useState(currentSettings.label || "Alarm");
  const [sound, setSound] = useState(currentSettings.sound || "Radial");
  const [snooze, setSnooze] = useState(
    currentSettings.snooze !== undefined ? currentSettings.snooze : true
  );
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setAlarmTime(parseTimeString(currentSettings.time));
      setRepeat(currentSettings.repeat || "Never");
      setLabel(currentSettings.label || "Alarm");
      setSound(currentSettings.sound || "Radial");
      setSnooze(
        currentSettings.snooze !== undefined ? currentSettings.snooze : true
      );
    }
  }, [visible, currentSettings]);

  // Convert Date to "HH:mm" format
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
      repeat,
      label,
      sound,
      snooze,
    });
    onClose();
  };

  // Toggle selection for each option:
  const handlePressRepeat = () => {
    const currentIndex = repeatOptions.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % repeatOptions.length;
    setRepeat(repeatOptions[nextIndex]);
  };

  const handlePressLabel = () => {
    const currentIndex = labelOptions.indexOf(label);
    const nextIndex = (currentIndex + 1) % labelOptions.length;
    setLabel(labelOptions[nextIndex]);
  };

  const handlePressSound = () => {
    const currentIndex = soundOptions.indexOf(sound);
    const nextIndex = (currentIndex + 1) % soundOptions.length;
    setSound(soundOptions[nextIndex]);
  };

  const handleDeleteAlarm = () => {
    // For demonstration, simply close the modal.
    onClose();
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
            <Text style={styles.navBarTitle}>Edit Alarm</Text>
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
              textColor="#fff"
            />
          </View>

          {/* Settings List with Select Buttons */}
          <View style={styles.tableContainer}>
            <TouchableOpacity
              style={styles.tableRow}
              onPress={handlePressRepeat}
            >
              <Text style={styles.tableRowLabel}>Repeat</Text>
              <Text style={styles.tableRowValue}>{repeat}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tableRow}
              onPress={handlePressLabel}
            >
              <Text style={styles.tableRowLabel}>Label</Text>
              <Text style={styles.tableRowValue}>{label}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tableRow}
              onPress={handlePressSound}
            >
              <Text style={styles.tableRowLabel}>Sound</Text>
              <Text style={styles.tableRowValue}>{sound}</Text>
            </TouchableOpacity>

            <View style={styles.tableRow}>
              <Text style={styles.tableRowLabel}>Snooze</Text>
              <Switch
                value={snooze}
                onValueChange={setSnooze}
                trackColor={{ true: "#34C759", false: "#767577" }}
                thumbColor="#f4f3f4"
              />
            </View>
          </View>

          {/* Delete Alarm Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAlarm}
          >
            <Text style={styles.deleteButtonText}>Delete Alarm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent overlay
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#1C1C1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  navBarTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  navBarButtonText: {
    color: "#0A84FF",
    fontSize: 16,
  },
  timePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  timeDisplay: {
    borderWidth: 1,
    borderColor: "#3A3A3C",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  timeDisplayText: {
    color: "#fff",
    fontSize: 32,
  },
  tableContainer: {
    backgroundColor: "#2C2C2E",
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
    borderBottomColor: "#3A3A3C",
  },
  tableRowLabel: {
    color: "#fff",
    fontSize: 16,
  },
  tableRowValue: {
    color: "#8E8E93",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#2C2C2E",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  deleteButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SettingsSheet;
