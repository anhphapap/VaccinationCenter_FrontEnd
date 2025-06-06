import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Badge, Button } from "react-native-paper";
import Styles, { color, defaultAvatar, logo } from "../../styles/Styles";
import Carousel from "./Carousel";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EventBanner from "../common/EventBanner";
import FeatureButton from "../common/FeatureButton";
import useUser from "../../hooks/useUser";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { collection, query, where, onSnapshot, or } from "firebase/firestore";
import { firestore } from "../../configs/firebase";

const Home = () => {
  const nav = useNavigation();
  const user = useUser();
  const [notificationCount, setNotificationCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);

  const loadNotificationCount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await authApis(token).get(endpoints.countNotification);
      setNotificationCount(res.data?.total_unread);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadChatCount = async () => {
    try {
      if (user?.is_staff) {
        const q = query(
          collection(firestore, "chats"),
          or(where("status", "==", "waiting"), where("staff.id", "==", user.id))
        );

        const unsub = onSnapshot(q, (snapshot) => {
          let c = 0;
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          list.forEach((item) => {
            c += item.staff.unread;
          });
          setChatCount(c);
        });
        return unsub;
      } else {
        const q = query(
          collection(firestore, "chats"),
          where("user.id", "==", user.id)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (list.length > 0) {
            setChatCount(list[0]?.user?.unread);
          } else {
            setChatCount(1);
          }
        });
        return unsub;
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    if (user) loadChatCount();
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) loadNotificationCount();
      return () => {};
    }, [user])
  );

  const listItem = [
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
    {
      label: "Lịch sử tiêm chủng",
      icon: "history",
      page: "history",
    },
    {
      label: "Hóa đơn",
      icon: "receipt",
      page: "receipt",
    },
  ];
  if (user?.is_staff) {
    listItem.push(
      {
        label: "Quản lý lịch tiêm",
        icon: "calendar-alt",
        page: "injectionManagement",
      },
      {
        label: "Quản lý bệnh nhân",
        icon: "hospital-user",
        page: "userManagement",
      }
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={{
          uri: "https://vnvc.vn/wp-content/themes/wg/images/header_thong_tin_san_pham_vacxin.jpg",
        }}
        style={styles.bgBanner}
        resizeMode="cover"
      />
      <ScrollView style={[Styles.container, { padding: 0 }]}>
        <View
          style={[
            Styles.rowSpaceCenter,
            { paddingLeft: 20, marginTop: 20, paddingRight: 10 },
          ]}
        >
          {user ? (
            <>
              <View style={[Styles.flexRow]}>
                <View style={{ marginRight: 10 }}>
                  <Image
                    source={{
                      uri: user?.avatar || defaultAvatar,
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
                    {user?.last_name + " " + user?.first_name}
                  </Text>
                </View>
              </View>
              <Button onPress={() => nav.navigate("notification")}>
                <View style={{ position: "relative" }}>
                  <FontAwesome5
                    name="bell"
                    color="white"
                    size={20}
                    solid={true}
                  ></FontAwesome5>
                  {notificationCount > 0 && (
                    <Badge
                      size={15}
                      style={{
                        backgroundColor: "red",
                        position: "absolute",
                        right: -8,
                        bottom: -7,
                      }}
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </View>
              </Button>
            </>
          ) : (
            <Image
              source={{ uri: logo.icon_name2 }}
              resizeMode="cover"
              style={styles.logo}
            ></Image>
          )}
        </View>
        <View style={[Styles.ph10, { height: 200, marginTop: 30 }]}>
          <Carousel></Carousel>
        </View>
        <View
          style={[
            Styles.flexRow,
            Styles.pv20,
            Styles.ph10,
            Styles.spaceAround,
            Styles.bgWhite,
            user?.is_staff && Styles.g20,
            { flexWrap: "wrap" },
          ]}
        >
          {listItem.map((item) => (
            <FeatureButton
              icon={item.icon}
              label={item.label}
              press={() => nav.navigate(item.page)}
              key={item.page}
            ></FeatureButton>
          ))}
        </View>
        <View style={[Styles.pv10, Styles.ph20, Styles.bgWhite]}>
          <EventBanner></EventBanner>
        </View>
        <View style={[Styles.pb20, Styles.ph10, Styles.bgWhite]}>
          <View style={[styles.adrsContainer, Styles.pv20, Styles.ph20]}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
              }}
              style={styles.adrsImg}
              resizeMode="cover"
            ></Image>
            <View>
              <Text style={Styles.fontBold}>Trụ sở chính</Text>
              <Text style={{ color: "gray" }}>
                Nhà Bè, Thành phố Hồ Chí Minh
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {user && (
        <TouchableOpacity
          style={styles.chatIcon}
          onPress={() => {
            user.is_staff ? nav.navigate("ChatList") : nav.navigate("Chat");
          }}
        >
          <FontAwesome5 name="comment-dots" size={30} color="#fff" />
          {chatCount > 0 && (
            <Badge
              size={20}
              style={{
                backgroundColor: "red",
                position: "absolute",
                right: -5,
                top: -5,
              }}
            >
              {chatCount}
            </Badge>
          )}
        </TouchableOpacity>
      )}
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
  chatIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: color.primary,
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
});
