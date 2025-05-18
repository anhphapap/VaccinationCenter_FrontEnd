import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Styles from "../../styles/Styles";
import NotificationCard from "../common/NotificationCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { useLoading } from "../../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../common/ShowToast";
import { Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Notification = ({ navigation }) => {
  const [list, setList] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const nav = useNavigation();

  const handlePress = async (item) => {
    if (!item.is_read) {
      const token = await AsyncStorage.getItem("token");
      await authApis(token).patch(endpoints.updateNotification(item.id), item);
      item.is_read = true;
    }
    nav.navigate("notificationDetail", {
      item: item,
    });
  };

  const handleReadAllNotification = async () => {
    try {
      showLoading();
      const token = await AsyncStorage.getItem("token");
      await authApis(token).patch(endpoints.updateAllNotification);
      setList((list) => list.map((item) => ({ ...item, is_read: true })));
      showToast({
        type: "success",
        text1: "Đã đánh dấu tất cả thông báo đã đọc",
      });
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleReadAllNotification}>
          <FontAwesome5 name="check-double" size={16} color={"white"} />
        </Button>
      ),
    });
  }, [navigation]);

  const loadData = async () => {
    try {
      showLoading();
      const token = await AsyncStorage.getItem("token");
      const res = await authApis(token).get(endpoints.notification);
      setList(res.data);
    } catch (ex) {
      console.log(ex);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView style={[Styles.flex, Styles.bgWhite]}>
      {list.map((item, index) => (
        <NotificationCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
