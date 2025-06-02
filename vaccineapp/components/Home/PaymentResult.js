import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";

const PaymentResult = ({ route }) => {
  const { status, orderId, message } = route.params;
  const nav = useNavigation();

  const handlePayment = async () => {
    if (!user) {
      nav.navigate("TÀI KHOẢN", {
        screen: "login",
        params: { redirect: "order" },
      });
      return;
    }
    if (validate()) {
      try {
        showLoading();
        const token = await AsyncStorage.getItem("token");
        let orderId = Date.now().toString();
        let res = await authApis(token).patch(endpoints.payment, {
          id: 40,
          order_id: orderId,
          order_desc: "Thanh toán PVVC",
          order_type: "other",
          bank_code: "NCB",
          language: "vn",
        });
        const data = await res.data;
        nav.navigate("payment", {
          paymentUrl: data.payment_url,
          orderId: orderId,
        });
      } catch (ex) {
        console.log(ex);
      } finally {
        hideLoading();
      }
    }
  };
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
        <Button
          style={styles.btn2}
          onPress={() => {
            nav.navigate("home");
            nav.reset({
              index: 0,
              routes: [{ name: "home" }],
            });
          }}
        >
          <Text style={{ color: "black" }}>Trang chủ</Text>
        </Button>

        {status === "success" ? (
          <Button
            style={styles.btn2}
            onPress={() => {
              nav.navigate("receipt");
              nav.reset({
                index: 1,
                routes: [{ name: "home" }, { name: "receipt" }],
              });
            }}
          >
            <Text style={{ color: "black" }}>Đơn mua</Text>
          </Button>
        ) : (
          <Button style={styles.btn2} onPress={handlePayment}>
            <Text style={{ color: "black" }}>Thanh toán lại</Text>
          </Button>
        )}
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
