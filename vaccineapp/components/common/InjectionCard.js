import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";
import { Badge } from "react-native-paper";
import { differenceInDays } from "date-fns";

const InjectionCard = () => {
  const dataTest = {
    date: "2025-03-15",
    label: "Mũi 1 - Cúm",
    name: "Vắc xin Vaxigrip Tetra",
    status: "Lịch tiêm vắc xin đã bị bỏ lỡ.",
  };
  const [mainColor, setMainColor] = useState(color.primary);

  useEffect(() => {
    const now = new Date();
    const injection_time = new Date(dataTest.date);
    if (injection_time.getTime() < now.getTime()) {
      setMainColor("#FF0000");
      dataTest.status = "Lịch tiêm vắc xin đã bị bỏ lỡ.";
    } else if (injection_time.getTime() === now.getTime()) {
      setMainColor(color.primary2);
      dataTest.status = "Đã đến ngày tiêm chủng.";
    } else {
      dataTest.status = `Còn ${differenceInDays(
        now,
        injection_time
      )} ngày nữa đến lịch tiêm vắc xin này.`;
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
          {new Date(dataTest.date).toLocaleDateString("vi-VN")}
        </Text>
        <Text style={[Styles.fontBold, Styles.fz16]}>{dataTest.label}</Text>
        <Text style={Styles.fz16}>{dataTest.name}</Text>
        <Text
          style={[
            styles.status,
            { backgroundColor: mainColor + "20", color: mainColor },
          ]}
        >
          {dataTest.status}
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
    top: "20%",
  },
});
