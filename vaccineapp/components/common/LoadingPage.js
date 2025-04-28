import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import Styles from "../../styles/Styles";

const LoadingPage = () => {
  return (
    <View
      style={[
        Styles.flex,
        Styles.alignCenter,
        Styles.flexCenter,
        { backgroundColor: "#00000010" },
      ]}
    >
      <ActivityIndicator
        animating={true}
        color="white"
        size={50}
      ></ActivityIndicator>
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({});
