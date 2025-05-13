import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";
import { Badge } from "react-native-paper";
import { differenceInDays } from "date-fns";

const InjectionCard = ({ item }) => {
  const [mainColor, setMainColor] = useState(color.primary);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const now = new Date();
    const injection_time = new Date(item.injection_date);
    const diff = differenceInDays(
      injection_time.setHours(0, 0, 0, 0),
      now.setHours(0, 0, 0, 0)
    );
    if (diff < 0) {
      setMainColor("#FF0000");
      setStatus("Lịch tiêm vắc xin đã bị bỏ lỡ.");
    } else if (diff === 0) {
      setMainColor(color.primary2);
      setStatus("Đã đến ngày tiêm chủng.");
    } else {
      setStatus(
        `Còn ${differenceInDays(
          injection_time,
          now
        )} ngày nữa đến lịch tiêm vắc xin này.`
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: logo.injection_bg }}
        style={styles.img}
        resizeMode="cover"
      ></Image>
      <View style={[styles.body, { borderLeftColor: mainColor }]}>
        <Text style={[Styles.fontBold, { color: mainColor, fontSize: 20 }]}>
          {new Date(item.injection_date).toLocaleDateString("vi-VN")}
        </Text>
        <Text style={[Styles.fontBold, Styles.fz16]}>
          {`MŨI ${item.number} - ${item.disease}`}
        </Text>
        <Text style={Styles.fz16}>{item.name}</Text>
        <Text
          style={[
            styles.status,
            { backgroundColor: mainColor + "20", color: mainColor },
          ]}
        >
          {status}
        </Text>
      </View>
      <Badge
        style={[
          styles.badge,
          {
            backgroundColor: mainColor,
          },
        ]}
        size={14}
      ></Badge>
    </View>
  );
};

export default InjectionCard;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  img: {
    width: "100%",
    aspectRatio: 2.2,
    position: "relative",
  },
  status: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    textAlign: "justify",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    borderLeftWidth: 3,
    paddingLeft: 20,
    paddingRight: 40,
    gap: 10,
    position: "absolute",
    width: "100%",
    marginLeft: 20,
    height: "100%",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    left: 15,
    top: "34%",
  },
});
