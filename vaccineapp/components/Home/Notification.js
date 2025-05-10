import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles from "../../styles/Styles";
import NotificationCard from "../common/NotificationCard";

const Notification = () => {
  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      <NotificationCard />
      <NotificationCard seen />
      <NotificationCard seen />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
