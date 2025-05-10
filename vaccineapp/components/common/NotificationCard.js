import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles, { color, logo } from "../../styles/Styles";

const NotificationCard = ({ seen }) => {
  return (
    <View
      style={[
        Styles.flexRow,
        Styles.p20,
        Styles.g20,
        {
          backgroundColor: seen ? "white" : "#f1f5fe",
          borderBottomWidth: 2,
          borderColor: color.secondary,
        },
      ]}
    >
      <View style={styles.left}>
        <Image source={{ uri: logo.icon }} style={styles.image} />
      </View>
      <View style={styles.right}>
        <Text style={[styles.title, { color: seen ? "gray" : "black" }]}>
          Vaccine Reminder
        </Text>
        <Text style={[styles.description, { color: seen ? "gray" : "black" }]}>
          You have a vaccine appointment on 10th June 2025 at 10:00 AM
        </Text>
        <Text style={[styles.time]}>10th June 2025 at 10:00 AM</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  left: {
    padding: 10,
    backgroundColor: "#ebf2ec",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  image: {
    width: 30,
    height: 30,
  },
  right: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
});
