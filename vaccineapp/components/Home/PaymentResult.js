import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PaymentResult = ({ route }) => {
  const { status, orderId, message } = route.params;
  const nav = useNavigation();
  return (
    <View
      style={[
        Styles.flex,
        Styles.alignCenter,
        Styles.bgWhite,
        Styles.flexCenter,
        Styles.ph20,
        { paddingBottom: "25%" },
      ]}
    >
      <FontAwesome5
        name={status === "success" ? "check-circle" : "times-circle"}
        size={100}
        color={status === "success" ? color.primary : "red"}
      />
      <Text
        style={[
          Styles.fontBold,
          Styles.fz20,
          Styles.mt10,
          { color: status === "success" ? color.primary : "red" },
        ]}
      >
        {message}
      </Text>
      <Text style={[Styles.fontRegular, Styles.fz16]}>
        Mã đơn hàng: {orderId}
      </Text>
      <View style={[Styles.rowSpaceCenter, Styles.mt20, Styles.g10]}>
        <Button style={styles.btn2} onPress={() => nav.navigate("home")}>
          <Text style={{ color: "black" }}>Trang chủ</Text>
        </Button>

        <Button style={styles.btn2} onPress={() => nav.navigate("receipt")}>
          <Text style={{ color: "black" }}>Đơn mua</Text>
        </Button>
      </View>
    </View>
  );
};

export default PaymentResult;

const styles = StyleSheet.create({
  btn2: {
    borderColor: "black",
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
});
