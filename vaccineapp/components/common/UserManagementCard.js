import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Styles, { color } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const UserManagementCard = ({ item }) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={[
        Styles.flexRow,
        Styles.ph20,
        Styles.pv10,
        Styles.spaceBetween,
        Styles.alignCenter,
        { borderBottomWidth: 1, borderColor: color.bg },
      ]}
      onPress={() => {
        nav.navigate("history", { user: item });
      }}
    >
      <View style={[Styles.flexRow, Styles.g20]}>
        <Image source={{ uri: item.avatar }} style={styles.img}></Image>
        <View style={{ justifyContent: "space-around" }}>
          <Text style={Styles.fontBold}>
            {item.last_name + " " + item.first_name}
          </Text>
          <Text style={{ color: "gray" }}>
            {(item.gender ? "Nam" : "Nữ") +
              " - " +
              new Date(item.birth_date).toLocaleDateString("vi-VN")}
          </Text>
        </View>
      </View>
      <View style={Styles.ph10}>
        <FontAwesome5 name="angle-right" size={20} color={color.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default UserManagementCard;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
