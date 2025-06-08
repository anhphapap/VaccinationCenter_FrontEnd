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
  const [page, setPage] = useState(1);

  const loadData = async (page) => {
    if (loading || page === 0) return;
    try {
      setLoading(true);
      showLoading();
      setList([]);
      const token = await AsyncStorage.getItem("token");
      const res = await authApis(token).get(
        endpoints.userInjections(user.id) +
          `?status=MISSED&status=NOT_VACCINATED&sort_by=date_asc&page=${page}`
      );
      let list = res.data.results;
      for (let x of list) {
        let res = await Apis.get(endpoints.vaccineDetails(x.vaccine));
        res.data.number = x.number;
        res.data.injection_date = x.injection_time;
        setList((prev) => [...prev, res.data]);
      }
      const nextPage = res.data.next ? page + 1 : 0;
      setPage(nextPage);
    } catch (ex) {
      console.log(ex);
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadData(page);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user) loadData(page);
    }, [])
  );

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      {user && <HeaderUserInfo></HeaderUserInfo>}
      {!loading &&
        (list.length === 0 ? (
          <View style={[Styles.flex, Styles.alignCenter, Styles.flexCenter]}>
            <NoneHistory
              title={"Bạn không có lịch tiêm chủng nào sắp tới."}
              description={false}
            ></NoneHistory>
            {!user && (
              <View style={[Styles.flexRow, Styles.alignCenter]}>
                <TouchableOpacity
                  onPress={() =>
                    nav.navigate("TÀI KHOẢN", {
                      screen: "login",
                      params: { redirect: "injections" },
                    })
                  }
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
          <ScrollView onEndReached={handleLoadMore} onEndReachedThreshold={0.5}>
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
