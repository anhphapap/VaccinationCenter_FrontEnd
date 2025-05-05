import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Styles, { color } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const dataTest = {
  number: 1,
  injection_date: "2025-02-15",
  name: "Prevenar 13",
  disease:
    "Viêm phổi, viêm màng não, viêm tai giữa cấp tính, nhiễm khuẩn huyết… do phế cầu khuẩn",
};

const HistoryCard = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={Styles.fontBold}>Phòng bệnh {dataTest.disease}</Text>
      </View>
      <TouchableOpacity
        style={[
          Styles.flexRow,
          Styles.alignCenter,
          Styles.spaceAround,
          {
            borderBottomColor: color.border,
            borderBottomWidth: 1,
            padding: 15,
          },
        ]}
      >
        <View style={{ height: "100%", paddingRight: 10 }}>
          <Text style={styles.txt1}>MŨI {dataTest.number}</Text>
          <Text style={styles.txt2}>
            {new Date(dataTest.injection_date).toLocaleDateString("vi-VN")}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <View
            style={{
              paddingHorizontal: 10,
              borderLeftWidth: 1,
              borderLeftColor: color.border,
              borderStyle: "dashed",
              marginBottom: 3,
            }}
          >
            <Text style={styles.txt2}>PVVC Nhà Bè</Text>
            <Text style={styles.txt1}>{dataTest.name}</Text>
          </View>
          <Text
            numberOfLines={2}
            style={[styles.txt2, { paddingLeft: 11, paddingRight: 10 }]}
          >
            Phòng bệnh {dataTest.disease}
          </Text>
        </View>
        <FontAwesome5
          name="chevron-right"
          size={16}
          color={"gray"}
        ></FontAwesome5>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: color.secondary,
  },
  txt1: {
    fontWeight: "500",
    fontSize: 16,
  },
  txt2: {
    color: "gray",
  },
});
