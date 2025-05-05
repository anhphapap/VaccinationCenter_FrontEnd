import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import HeaderUserInfo from "../common/HeaderUserInfo";
import Styles, { color } from "../../styles/Styles";
import HistoryCard from "../common/HistoryCard";

const History = () => {
  const [tab, setTab] = useState(true);

  return (
    <View style={[Styles.flex, Styles.bgWhite]}>
      <HeaderUserInfo></HeaderUserInfo>
      <View>
        <View style={[Styles.flexRow]}>
          <TouchableOpacity
            style={[styles.tabHeader, tab && styles.onTab]}
            onPress={() => setTab(!tab)}
          >
            <Text style={[Styles.fontBold, tab && { color: color.primary }]}>
              Lịch sử tiêm chủng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabHeader, !tab && styles.onTab]}
            onPress={() => setTab(!tab)}
          >
            <Text style={[Styles.fontBold, !tab && { color: color.primary }]}>
              Mũi tiêm kế tiếp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <HistoryCard></HistoryCard>
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
