import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import InjectionCard from "../common/InjectionCard";
import Styles, { color, defaultAvatar, logo } from "../../styles/Styles";
import HeaderUserInfo from "../common/HeaderUserInfo";
import NoneHistory from "../common/NoneHistory";
import useUser from "../../hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import { useLoading } from "../../contexts/LoadingContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Injections = () => {
  const [list, setList] = useState([]);
  const user = useUser();
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const loadData = async () => {
    try {
      setLoading(true);
      showLoading();
      setList([]);
      const token = await AsyncStorage.getItem("token");
      const res = await authApis(token).get(
        endpoints.userInjections(user.id) +
          "?status=MISSED&status=NOT_VACCINATED&sort_by=date_asc"
      );
      let list = res.data;
      for (let x of list) {
        let res = await Apis.get(endpoints.vaccineDetails(x.vaccine));
        res.data.number = x.number;
        res.data.injection_date = x.injection_time;
        setList((prev) => [...prev, res.data]);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user) loadData();
    }, [])
  );

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      {user && <HeaderUserInfo></HeaderUserInfo>}
      {!loading &&
        (list.length === 0 ? (
          <View style={[Styles.flex, Styles.alignCenter, Styles.flexCenter]}>
            <NoneHistory></NoneHistory>
            {!user && (
              <View style={[Styles.flexRow, Styles.alignCenter]}>
                <TouchableOpacity
                  onPress={() => nav.navigate("TÀI KHOẢN", { screen: "login" })}
                >
                  <Text style={[Styles.fontBold, Styles.underline]}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
                <Text> để xem lịch tiêm của bạn</Text>
              </View>
            )}
          </View>
        ) : (
          <ScrollView>
            {list.map((item) => (
              <InjectionCard
                key={item.id + item.injection_date}
                item={item}
              ></InjectionCard>
            ))}
          </ScrollView>
        ))}
    </View>
  );
};

export default Injections;

const styles = StyleSheet.create({
  btn1: {
    backgroundColor: color.primary,
    borderRadius: 10,
    marginVertical: 10,
  },
});
