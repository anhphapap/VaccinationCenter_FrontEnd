import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { color } from "../../styles/Styles"; // Import màu của bạn

const LoadingOverlay = ({ visible, title = "Đang tải..." }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={styles.loadingText}>{title}</Text>
      </View>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontWeight: "bold",
    color: color.primary,
  },
});
