import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Styles, { color, logo } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ReceiptCard = () => {
  return (
    <View style={[Styles.bgWhite, Styles.rounded10, Styles.p10]}>
      <View style={[Styles.flexRow, Styles.spaceBetween]}>
        <View style={[Styles.flexRow, Styles.alignCenter]}>
          <Image
            source={{ uri: logo.icon }}
            style={{ width: 20, aspectRatio: 1, marginRight: 5 }}
          />
          <Text style={Styles.fontPreBold}>12/5/2025</Text>
        </View>

        <Text style={[Styles.fontPreBold, { color: color.primary2 }]}>
          Đã thanh toán
        </Text>
      </View>
      <View style={[Styles.g20, Styles.mv20]}>
        <TouchableOpacity style={[Styles.flexRow, Styles.g10]}>
          <Image
            source={{
              uri: "https://vnvc.vn/wp-content/uploads/2022/08/vac-xin-Heberbiovac-HB.jpg",
            }}
            style={{ height: 80, aspectRatio: 2 }}
          />
          <View style={[Styles.flex, Styles.spaceBetween]}>
            <View>
              <Text style={Styles.fontPreBold}>Vacxin Heberbiovac</Text>
              <Text style={{ color: "gray" }}>Phòng bệnh: Cúm</Text>
            </View>
            <Text style={[{ alignSelf: "flex-end" }]}>100.000đ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.flexRow, Styles.g10]}>
          <Image
            source={{
              uri: "https://vnvc.vn/wp-content/uploads/2022/08/vac-xin-Heberbiovac-HB.jpg",
            }}
            style={{ height: 80, aspectRatio: 2 }}
          />
          <View style={[Styles.flex, Styles.spaceBetween]}>
            <View>
              <Text style={[Styles.fontPreBold]}>Vacxin Heberbiovac</Text>
              <Text style={{ color: "gray" }}>Phòng bệnh: Cúm</Text>
            </View>
            <Text style={[{ alignSelf: "flex-end" }]}>100.000đ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[Styles.fontPreBold, { color: "gray", alignSelf: "center" }]}
          >
            Xem thêm <FontAwesome5 name="chevron-down" size={12} color="gray" />
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[Styles.fontBold, { alignSelf: "flex-end" }]}>
        Tổng cộng: 200.000đ
      </Text>
    </View>
  );
};

export default ReceiptCard;

const styles = StyleSheet.create({});
