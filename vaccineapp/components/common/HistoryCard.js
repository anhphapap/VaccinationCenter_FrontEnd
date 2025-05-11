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

const HistoryCard = ({ item, showDetails }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={Styles.fontBold}>Phòng bệnh {item.vaccine.disease}</Text>
      </View>
      <TouchableOpacity
        style={[
          Styles.flexRow,
          Styles.alignCenter,
          Styles.justifyBetween,
          {
            borderBottomColor: color.border,
            borderBottomWidth: 1,
            padding: 15,
          },
        ]}
        onPress={showDetails}
      >
        <View style={{ width: "95%" }}>
          <View
            style={[Styles.flexRow, Styles.alignCenter, Styles.spaceBetween]}
          >
            <View style={{ height: "100%", paddingRight: 10 }}>
              <Text style={styles.txt1}>MŨI {item.number}</Text>
              <Text style={styles.txt2}>
                {new Date(item.injection_time).toLocaleDateString("vi-VN")}
              </Text>
            </View>
            <View style={{ width: "80%" }}>
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
                <Text style={styles.txt1}>{item.vaccine.name}</Text>
              </View>
              <Text
                numberOfLines={2}
                style={[styles.txt2, { paddingLeft: 11, paddingRight: 10 }]}
              >
                Phòng bệnh {item.vaccine.disease}
              </Text>
            </View>
          </View>
          {item.campaign && (
            <View style={[Styles.flexRow, Styles.alignCenter, Styles.mt10]}>
              <Text style={[styles.txt2, Styles.fontPreBold]}>Đợt tiêm: </Text>
              <Text style={Styles.fontPreBold}>{item.campaign.name}</Text>
            </View>
          )}
        </View>
        <View style={{ width: 20 }}>
          <FontAwesome5
            name="chevron-right"
            size={16}
            color={"gray"}
          ></FontAwesome5>
        </View>
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
