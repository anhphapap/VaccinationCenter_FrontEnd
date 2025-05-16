import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";

const NotificationCard = ({ item, onPress }) => {
  const [isRead, setIsRead] = useState();
  const handlePress = () => {
    if (!isRead) {
      setIsRead(true);
    }
    onPress();
  };

  useEffect(() => {
    setIsRead(item.is_read);
  }, [item]);
  return (
    <TouchableOpacity
      style={[
        Styles.flexRow,
        Styles.p20,
        Styles.g20,
        {
          backgroundColor: isRead ? "white" : color.bg,
          borderBottomWidth: 2,
          borderColor: color.secondary,
        },
      ]}
      onPress={handlePress}
    >
      <View style={styles.left}>
        <Image source={{ uri: logo.icon }} style={styles.image} />
      </View>
      <View style={styles.right}>
        <Text style={[styles.title, { color: isRead ? "gray" : "black" }]}>
          {item.title}
        </Text>
        <Text style={[styles.time]}>
          {new Date(item.notification_date).toLocaleString("vi-VN")}
        </Text>
      </View>
    </TouchableOpacity>
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
