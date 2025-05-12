import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles, { logo } from "../../styles/Styles";

const NoneVaccine = ({ title }) => {
  return (
    <View
      style={[
        Styles.alignCenter,
        Styles.flexCenter,
        Styles.flex,
        { marginTop: "30%" },
      ]}
    >
      <Image
        source={{ uri: logo.not_found }}
        resizeMode="cover"
        style={styles.notFound}
      />
      <Text style={[Styles.fontBold, Styles.fz18, { color: "gray" }]}>
        {title}
      </Text>
    </View>
  );
};

export default NoneVaccine;

const styles = StyleSheet.create({
  notFound: {
    width: 250,
    height: 250,
  },
});
