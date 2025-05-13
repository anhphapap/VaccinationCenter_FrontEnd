import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderUserInfo from "../common/HeaderUserInfo";
import Styles, { color } from "../../styles/Styles";
import HistoryCard from "../common/HistoryCard";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import NoneHistory from "../common/NoneHistory";
import useUser from "../../hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoading } from "../../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";
const History = () => {
  const [tab, setTab] = useState(true);
  const [listHistory, setListHistory] = useState([]);
  const [listNext, setListNext] = useState([]);
  const user = useUser();
  const { showLoading, hideLoading } = useLoading();
  const nav = useNavigation();

  const loadHistory = async () => {
    if (user) {
      try {
        showLoading();
        const token = await AsyncStorage.getItem("token");
        const res = await authApis(token).get(
          endpoints.userInjections(user?.username) + "?sort_by=date_asc"
        );
        let list = res.data;
        for (let x of list) {
          let res = await Apis.get(endpoints.vaccineDetails(x.vaccine));
          x.vaccine = res.data;
          if (x.vaccination_campaign !== 1) {
            let campaign = await Apis.get(
              endpoints.campaignDetails(x.vaccination_campaign)
            );
            x.campaign = campaign.data;
          }
          if (x.status === "NOT_VACCINATED") {
            setListNext((prev) => [...prev, x]);
          } else if (x.status === "VACCINATED") {
            setListHistory((prev) => [...prev, x]);
          }
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        hideLoading();
      }
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      {user && (
        <>
          <HeaderUserInfo></HeaderUserInfo>
          <View>
            <View style={[Styles.flexRow]}>
              <TouchableOpacity
                style={[styles.tabHeader, tab && styles.onTab]}
                onPress={() => setTab(!tab)}
              >
                <Text
                  style={[Styles.fontBold, tab && { color: color.primary }]}
                >
                  Lịch sử tiêm chủng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabHeader, !tab && styles.onTab]}
                onPress={() => setTab(!tab)}
              >
                <Text
                  style={[Styles.fontBold, !tab && { color: color.primary }]}
                >
                  Mũi tiêm kế tiếp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {tab ? (
        listHistory.length === 0 ? (
          <View style={[Styles.flex, Styles.alignCenter, Styles.flexCenter]}>
            <NoneHistory />
            {!user && (
              <View style={[Styles.flexRow, Styles.alignCenter]}>
                <TouchableOpacity
                  onPress={() => nav.navigate("TÀI KHOẢN", { screen: "login" })}
                >
                  <Text style={[Styles.fontBold, Styles.underline]}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
                <Text> để xem lịch sử tiêm của bạn</Text>
              </View>
            )}
          </View>
        ) : (
          <ScrollView>
            {listHistory.map((item, index) => (
              <HistoryCard
                key={"history" + item.id + index}
                item={item}
                showDetails={() =>
                  nav.navigate("historyDetails", {
                    data: item,
                  })
                }
              ></HistoryCard>
            ))}
          </ScrollView>
        )
      ) : listNext.length === 0 ? (
        <View style={[Styles.flex, Styles.alignCenter, Styles.flexCenter]}>
          <NoneHistory />
        </View>
      ) : (
        <ScrollView>
          {listNext.map((item, index) => (
            <HistoryCard
              key={"history" + item.id + index}
              item={item}
              showDetails={() =>
                nav.navigate("historyDetails", {
                  data: item,
                })
              }
            ></HistoryCard>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  tabHeader: {
    paddingVertical: 10,
    width: "50%",
    alignItems: "center",
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  onTab: {
    borderBottomColor: color.primary,
    borderBottomWidth: 3,
  },
});
