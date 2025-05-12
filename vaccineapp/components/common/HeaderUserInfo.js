import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import useUser from "../../hooks/useUser";

const HeaderUserInfo = () => {
  const user = useUser();
  return (
    user && (
      <View style={styles.header}>
        <View style={styles.borderAvt}>
          <Image
            source={{
              uri: user.avatar,
            }}
            style={styles.avt}
          ></Image>
        </View>
        <Text
          style={[
            Styles.fontBold,
            Styles.mt10,
            {
              textTransform: "uppercase",
              color: color.primary,
              width: "100%",
              textAlign: "center",
            },
          ]}
        >
          {user.last_name + " " + user.first_name}
        </Text>
        <Text style={{ color: color.primary }}>
          {user.gender ? "Nam" : "Nữ"} -{" "}
          {new Date(user.birth_date).toLocaleDateString("vi-VN")}
        </Text>
      </View>
    )
  );
};

export default HeaderUserInfo;

const styles = StyleSheet.create({
  avt: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  borderAvt: {
    borderWidth: 3,
    borderColor: color.primary,
    width: 66,
    height: 66,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: color.secondary,
    borderBottomWidth: 10,
    width: "100%",
  },
});
