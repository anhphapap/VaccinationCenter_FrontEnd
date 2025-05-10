import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button } from "react-native-paper";
import Styles, { color, defaultAvatar, logo } from "../../styles/Styles";
import Carousel from "./Carousel";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EventBanner from "../common/EventBanner";
import FeatureButton from "../common/FeatureButton";
import useUser from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const listItem = [
  {
    label: "Đặt lịch",
    icon: "calendar-alt",
    page: "book",
  },
  {
    label: "Lịch sử tiêm chủng",
    icon: "history",
    page: "history",
  },
  {
    label: "Danh mục vắc xin",
    icon: "list",
    page: "vaccine",
  },
  {
    label: "Đặt mua vắc xin",
    icon: "syringe",
    page: "order",
  },
];

const Home = () => {
  const nav = useNavigation();
  const user = useUser();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={{
          uri: "https://vnvc.vn/wp-content/themes/wg/images/header_thong_tin_san_pham_vacxin.jpg",
        }}
        style={styles.bgBanner}
        resizeMode="cover"
      />
      <View style={Styles.container}>
        <View
          style={[Styles.rowSpaceCenter, { paddingLeft: 10, marginTop: 10 }]}
        >
          {user ? (
            <View style={Styles.flexRow}>
              <View style={{ marginRight: 10 }}>
                <Image
                  source={{
                    uri:
                      user?.avatar === "/static/images/avatar.png"
                        ? defaultAvatar
                        : user?.avatar,
                  }}
                  style={styles.avt}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={Styles.flexCol}>
                <Text style={Styles.textWhite}>Xin chào,</Text>
                <Text
                  style={[
                    Styles.textWhite,
                    { fontWeight: "bold", textTransform: "uppercase" },
                  ]}
                >
                  {user.last_name + " " + user.first_name}
                </Text>
              </View>
            </View>
          ) : (
            <Image
              source={{ uri: logo.icon_name2 }}
              resizeMode="cover"
              style={styles.logo}
            ></Image>
          )}
          <Button onPress={() => nav.navigate("notification")}>
            <FontAwesome5 name="bell" color="white" size={20}></FontAwesome5>
          </Button>
        </View>
        <View style={{ height: 200, marginTop: 30 }}>
          <Carousel></Carousel>
        </View>
        <View style={[Styles.flexRow, Styles.mv20, Styles.spaceAround]}>
          {listItem.map((item) => (
            <FeatureButton
              icon={item.icon}
              label={item.label}
              press={
                !user && item.page !== "vaccine"
                  ? () =>
                      Toast.show({
                        type: "info",
                        text1: "Vui lòng đăng nhập để sử dụng chức năng!",
                      })
                  : () => nav.navigate(item.page)
              }
              key={item.page}
            ></FeatureButton>
          ))}
        </View>
        <View style={[Styles.mv10, Styles.ph10]}>
          <EventBanner></EventBanner>
        </View>
        <View style={[styles.adrsContainer, Styles.mv20]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
            }}
            style={styles.adrsImg}
            resizeMode="cover"
          ></Image>
          <View>
            <Text style={Styles.fontBold}>Trụ sở chính</Text>
            <Text style={{ color: "gray" }}>Nhà Bè, Thành phố Hồ Chí Minh</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  adrsContainer: {
    marginTop: 20,
    flexDirection: "row",
    padding: 20,
    backgroundColor: color.secondary,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  adrsImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  bgBanner: {
    position: "absolute",
    left: "-10%",
    top: 0,
    width: "120%",
    height: 220,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  avt: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  logo: {
    height: 40,
    width: 100,
  },
});
