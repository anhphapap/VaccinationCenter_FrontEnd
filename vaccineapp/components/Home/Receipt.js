import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Styles, { color } from "../../styles/Styles";
import ReceiptCard from "../common/ReceiptCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { ActivityIndicator } from "react-native-paper";
import { useLoading } from "../../contexts/LoadingContext";

const Receipt = () => {
  const [tab, setTab] = useState("all");
  const [data, setData] = useState({
    all: { list: [], page: 1, loading: false },
    paid: { list: [], page: 1, loading: false },
    pending: { list: [], page: 1, loading: false },
  });
  const [loading, setLoading] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const fetchData = async (page, status) => {
    if (data[status].loading || page === 0) return;
    setLoading(true);
    showLoading();
    setData((prev) => ({
      ...prev,
      [status]: { ...prev[status], loading: true },
    }));
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await authApis(token).get(
        `${endpoints.orders}?page=${page}${
          status === "all" ? "" : `&status=${status}`
        }`
      );
      const result = response.data.results;
      setData((prev) => {
        const newList = page === 1 ? result : [...prev[status].list, ...result];
        const nextPage = response.data.next ? page + 1 : 0;

        return {
          ...prev,
          [status]: {
            list: newList,
            page: nextPage,
            loading: false,
          },
        };
      });
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      setData((prev) => ({
        ...prev,
        [status]: { ...prev[status], loading: false },
      }));
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  const handleLoadMore = () => {
    fetchData(data[tab].page, tab);
  };

  useEffect(() => {
    fetchData(data[tab].page, tab);
  }, [tab]);
  return (
    <View style={[Styles.flex, Styles.pb10, { backgroundColor: "#f6f6f6" }]}>
      <View style={[Styles.bgWhite, Styles.alignCenter]}>
        <View style={[Styles.flexRow]}>
          <TouchableOpacity
            style={[styles.tabHeader, tab === "all" && styles.onTab]}
            onPress={() => setTab("all")}
          >
            <Text
              style={[
                Styles.fontBold,
                tab === "all" && { color: color.primary },
              ]}
            >
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabHeader, tab === "paid" && styles.onTab]}
            onPress={() => setTab("paid")}
          >
            <Text
              style={[
                Styles.fontBold,
                tab === "paid" && { color: color.primary },
              ]}
            >
              Đã thanh toán
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabHeader, tab === "pending" && styles.onTab]}
            onPress={() => setTab("pending")}
          >
            <Text
              style={[
                Styles.fontBold,
                tab === "pending" && { color: color.primary },
              ]}
            >
              Chưa thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={Styles.p10}
        showsVerticalScrollIndicator={false}
        onScroll={handleLoadMore}
        ListFooterComponent={
          loading && (
            <ActivityIndicator
              size="20"
              color={color.primary}
              style={Styles.mv20}
            />
          )
        }
      >
        {data[tab]?.list?.map((item, index) => (
          <ReceiptCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  tabHeader: {
    paddingVertical: 10,
    width: "33.33%",
    alignItems: "center",
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  onTab: {
    borderBottomColor: color.primary,
    borderBottomWidth: 3,
  },
});
