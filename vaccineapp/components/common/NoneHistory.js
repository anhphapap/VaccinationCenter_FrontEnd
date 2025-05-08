import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles, { logo } from "../../styles/Styles";

const NoneHistory = () => {
  return (
    <View style={styles.noneContainer}>
      <Image
        source={{ uri: logo.none_item }}
        style={styles.noneImg}
        resizeMode="cover"
      ></Image>
      <Text style={Styles.fontBold}>Bạn chưa có lịch sử tiêm</Text>
      <Text style={styles.noneTxt}>
        Lịch sử tiêm chủng sẽ giúp bạn theo dõi toàn bộ lịch sử tiêm vắc xin của
        khách hàng.
      </Text>
    </View>
  );
};

export default NoneHistory;

const styles = StyleSheet.create({
  noneImg: {
    width: 150,
    height: 120,
    marginBottom: 10,
  },
  noneContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: "25%",
  },
  noneTxt: {
    textAlign: "center",
    color: "gray",
    fontWeight: "500",
    marginTop: 5,
  },
});
