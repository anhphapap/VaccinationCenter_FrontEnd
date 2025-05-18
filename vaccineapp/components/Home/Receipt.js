import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Styles, { color } from "../../styles/Styles";
import ReceiptCard from "../common/ReceiptCard";

const Receipt = () => {
  const [tab, setTab] = useState("all");
  return (
    <View style={[Styles.flex, { backgroundColor: "#f6f6f6" }]}>
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
      <ScrollView style={Styles.p10} showsVerticalScrollIndicator={false}>
        <ReceiptCard />
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
