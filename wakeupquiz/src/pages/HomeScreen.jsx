import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SettingsSheet from "./SettingsSheet";

const HomeScreen = () => {
  const [settings, setSettings] = useState({
    time: "07:00",
    repeat: "Never",
    label: "Alarm",
    sound: "Radial",
    snooze: true,
  });
  const [showSheet, setShowSheet] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{settings.time}</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleOpenSheet}>
        <Text style={styles.editButtonText}>Edit Alarm</Text>
      </TouchableOpacity>

      <SettingsSheet
        visible={showSheet}
        onClose={handleCloseSheet}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 48,
    color: "#fff",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#0A84FF",
    padding: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default HomeScreen;
