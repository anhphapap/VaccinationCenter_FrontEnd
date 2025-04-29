import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Styles, { color } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";

const VaccineCard = ({ image, name, disease, price, btnDel, btnSell }) => {
  return (
    <View style={styles.iContainer}>
      <View style={[Styles.rowSpaceCenter, { justifyContent: "flex-start" }]}>
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          style={styles.img}
        ></Image>
        <View style={Styles.flexShink}>
          <Text
            style={{
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: 16,
              flexWrap: "wrap",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
      <View style={[Styles.flexRow, Styles.mt20, Styles.wrap]}>
        <Text style={{ fontWeight: "bold" }}>Phòng bệnh: </Text>
        <Text>{disease === "" ? "Đang cập nhập..." : disease}</Text>
      </View>
      <View style={[Styles.rowSpaceCenter, Styles.mt10]}>
        <Text style={styles.price}>{price.toLocaleString()} VNĐ</Text>
        {btnDel && (
          <TouchableOpacity>
            <FontAwesome5 name="trash" color={"red"} size={16}></FontAwesome5>
          </TouchableOpacity>
        )}
      </View>
      {btnSell && (
        <View style={[Styles.rowSpaceCenter, Styles.mt20, { gap: 10 }]}>
          <Button style={styles.btn1}>
            <FontAwesome5
              name="shopping-cart"
              color={"white"}
              size={14}
            ></FontAwesome5>
            <Text style={[Styles.fontBold, { color: "white" }]}>
              {" "}
              Thêm vào giỏ
            </Text>
          </Button>
          <Button style={styles.btn2}>
            <Text style={{ color: "#0a56df" }}>Mua ngay</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const areEqual = (prev, next) =>
  prev.image === next.image &&
  prev.name === next.name &&
  prev.disease === next.disease &&
  prev.price === next.price &&
  prev.btnDel === next.btnDel &&
  prev.btnSell === next.btnSell;

export default React.memo(VaccineCard, areEqual);

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 160,
    marginRight: 10,
  },
  price: {
    color: color.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  iContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 10,
  },
  btn1: {
    backgroundColor: color.primary,
    borderRadius: 10,
    flex: 1,
  },
  btn2: {
    borderColor: color.primary,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
});
