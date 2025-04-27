import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { color } from "../../styles/Styles";

const FloatBottomButton = ({ label, icon }) => {
  return (
    <View style={styles.iBottom}>
      <TouchableOpacity style={styles.closeBtn}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{label}</Text>
        {icon && (
          <FontAwesome5 name={icon} size={14} color={"white"}></FontAwesome5>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FloatBottomButton;

const styles = StyleSheet.create({
  iBottom: {
    borderTopWidth: 1,
    borderColor: color.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
  },
  closeBtn: {
    backgroundColor: color.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
