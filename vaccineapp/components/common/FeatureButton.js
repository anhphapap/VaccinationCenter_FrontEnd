import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Styles, { color } from "../../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FeatureButton = ({ label, icon, press }) => {
  return (
    <View style={Styles.alignCenter}>
      <TouchableOpacity style={styles.btn} onPress={press}>
        <FontAwesome5
          name={icon}
          size={30}
          color={color.primary}
          solid
        ></FontAwesome5>
      </TouchableOpacity>
      <Text style={styles.txtLabel}>{label}</Text>
    </View>
  );
};

export default FeatureButton;

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: color.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  txtLabel: {
    fontSize: 12,
    textAlign: "center",
    margin: 10,
    width: 70,
    fontWeight: "400",
  },
});
