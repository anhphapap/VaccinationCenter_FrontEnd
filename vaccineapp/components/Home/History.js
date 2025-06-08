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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoading } from "../../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";
import useUser from "../../hooks/useUser";
const History = ({ route }) => {
  const [tab, setTab] = useState("history");
  const [data, setData] = useState({
    history: { list: [], page: 1, loading: false, status: "VACCINATED" },
    next: { list: [], page: 1, loading: false, status: "NOT_VACCINATED" },
  });
  const { showLoading, hideLoading } = useLoading();
  const nav = useNavigation();
  const user = route?.params?.user || useUser();

  const loadHistory = async (page, tab) => {
    if (data[tab].loading || page === 0) return;
    showLoading();
    setData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], loading: true },
    }));
    if (user) {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await authApis(token).get(
          endpoints.userInjections(user?.id) +
            `?sort_by=date_asc&page=${page}&status=${data[tab].status}`
        );
        let list = res.data.results;
        for (let x of list) {
          let vaccine = await Apis.get(endpoints.vaccineDetails(x.vaccine));
          x.vaccine = vaccine.data;
          x.user = user;
          if (x.vaccination_campaign !== 1) {
            let campaign = await Apis.get(
              endpoints.campaignDetails(x.vaccination_campaign)
            );
            x.campaign = campaign.data;
          }
        }
        const nextPage = res.data.next ? page + 1 : 0;
        setData((prev) => {
          const newList = page === 1 ? list : [...prev[tab].list, ...list];
          return {
            ...prev,
            [tab]: {
              ...prev[tab],
              list: newList,
              page: nextPage,
              loading: false,
            },
          };
        });
      } catch (ex) {
        console.log(ex);
      } finally {
        hideLoading();
      }
    }
  };

  useEffect(() => {
    loadHistory(1, tab);
  }, [tab]);

  const handleLoadMore = () => {
    loadHistory(data[tab].page, tab);
  };

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      {user && (
        <>
          <HeaderUserInfo user={user}></HeaderUserInfo>
          <View>
            <View style={[Styles.flexRow]}>
              <TouchableOpacity
                style={[styles.tabHeader, tab === "history" && styles.onTab]}
                onPress={() => setTab("history")}
              >
                <Text
                  style={[
                    Styles.fontBold,
                    tab === "history" && { color: color.primary },
                  ]}
                >
                  Lịch sử tiêm chủng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabHeader, tab === "next" && styles.onTab]}
                onPress={() => setTab("next")}
              >
                <Text
                  style={[
                    Styles.fontBold,
                    tab === "next" && { color: color.primary },
                  ]}
                >
                  Mũi tiêm kế tiếp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {tab === "history" ? (
        data.history?.list?.length === 0 && !data.history.loading ? (
          <View style={[Styles.flex, Styles.alignCenter, Styles.flexCenter]}>
            <NoneHistory />
            {!user && (
              <View style={[Styles.flexRow, Styles.alignCenter]}>
                <TouchableOpacity
                  onPress={() =>
                    nav.navigate("TÀI KHOẢN", {
                      screen: "login",
                      params: { redirect: "history" },
                    })
                  }
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
          <ScrollView onEndReached={handleLoadMore} onEndReachedThreshold={0.5}>
            {data.history?.list?.map((item, index) => (
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
      ) : data.next?.list?.length === 0 && !data.next.loading ? (
        <View style={[Styles.flex, Styles.alignCenter, Styles.flexCenter]}>
          <NoneHistory />
        </View>
      ) : (
        <ScrollView onEndReached={handleLoadMore} onEndReachedThreshold={0.5}>
          {data.next?.list?.map((item, index) => (
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
