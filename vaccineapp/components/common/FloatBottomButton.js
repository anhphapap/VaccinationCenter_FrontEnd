import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";

const FloatBottomButton = ({ label, icon, press, loading = false }) => {
  return (
    <View style={styles.iBottom}>
      <Button
        style={styles.closeBtn}
        onPress={press}
        loading={loading}
        disabled={loading}
        textColor="white"
        contentStyle={styles.contentBtn}
        labelStyle={styles.btnTxt}
      >
        <Text style={[styles.btnTxt]}>{label + "  "}</Text>
        {icon && (
          <FontAwesome5
            name={icon}
            size={14}
            color="white"
            style={{ marginLeft: 8 }}
          />
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
    margin: 20,
    borderRadius: 10,
  },
  btnTxt: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
});
