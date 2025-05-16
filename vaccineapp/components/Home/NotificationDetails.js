import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles, { logo } from "../../styles/Styles";

const NotificationDetails = ({ route }) => {
  const { item } = route.params;
  return (
    <View style={[Styles.flex, Styles.bgWhite, Styles.p20]}>
      <Image source={{ uri: logo.icon_name2 }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.time}>
        {new Date(item.notification_date).toLocaleString("vi-VN")}
      </Text>
      <Text style={styles.description}>{item.message}</Text>
    </View>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  image: {
    width: 100,
    aspectRatio: 2.3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "uppercase",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
  time: {
    fontSize: 12,
    color: "gray",
    marginTop: 10,
  },
});
