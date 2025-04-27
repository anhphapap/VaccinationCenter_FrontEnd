import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { color } from "../../styles/Styles";

const GenderPicker = () => {
  const [gender, setGender] = useState("male");

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, gender === "male" && styles.buttonActive]}
          onPress={() => setGender("male")}
        >
          <Text
            style={[
              styles.buttonText,
              gender === "male" && styles.buttonTextActive,
            ]}
          >
            Nam
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, gender === "female" && styles.buttonActive]}
          onPress={() => setGender("female")}
        >
          <Text
            style={[
              styles.buttonText,
              gender === "female" && styles.buttonTextActive,
            ]}
          >
            Nữ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GenderPicker;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 7,
    overflow: "hidden",
    padding: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  buttonActive: {
    backgroundColor: color.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTextActive: {
    color: "#fff",
  },
});
