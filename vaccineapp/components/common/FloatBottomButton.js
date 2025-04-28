import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { color } from "../../styles/Styles";
import { Button } from "react-native-paper";

const FloatBottomButton = ({ label, icon, press, loading }) => {
  return (
    <View style={styles.iBottom}>
      <Button
        style={styles.closeBtn}
        onPress={press}
        loading={loading}
        disabled={loading}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {label + " "}{" "}
        </Text>
        {icon && (
          <FontAwesome5 name={icon} size={14} color={"white"}></FontAwesome5>
        )}
      </Button>
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
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
