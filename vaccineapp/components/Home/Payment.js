import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";

const Payment = ({ route, navigation }) => {
  const { paymentUrl, orderId } = route.params;
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();
  const handleWebviewClose = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await authApis(token).get(endpoints.orderStatus(orderId));
      if (res.data.vnp_ResponseCode === "00") {
        nav.replace("paymentResult", {
          status: "success",
          orderId: orderId,
          message: "Thanh toán thành công",
        });
      } else {
        nav.replace("paymentResult", {
          status: "fail",
          orderId: orderId,
          message: "Thanh toán không thành công",
        });
      }
    } catch (err) {
      console.log(err);
      nav.replace("paymentResult", {
        status: "fail",
        orderId: orderId,
        message: "Không thể xác minh trạng thái đơn hàng",
      });
    }
  };

  const handleNavigationChange = (navState) => {
    const url = navState.url;
    if (url.includes("vnp_ResponseCode")) {
      const queryString = url.split("?")[1];
      const params = new URLSearchParams(queryString);
      const responseCode = params.get("vnp_ResponseCode");
      const txnRef = params.get("vnp_TxnRef");

      if (responseCode === "00") {
        nav.replace("paymentResult", {
          status: "success",
          orderId: txnRef,
          message: "Thanh toán thành công",
        });
      } else {
        nav.replace("paymentResult", {
          status: "fail",
          orderId: txnRef,
          message: "Thanh toán không thành công",
        });
      }
    }
  };

  const handleBackAction = () => {
    Alert.alert(
      "Hủy thanh toán",
      "Bạn có chắc muốn thoát khỏi quá trình thanh toán?",
      [
        { text: "Không", style: "cancel" },
        {
          text: "Có",
          onPress: () => {
            handleWebviewClose();
          },
        },
      ]
    );
    return true;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={handleBackAction}>
          <FontAwesome5 name="arrow-left" size={20} color={"white"} />
        </Button>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", handleBackAction);
    }, [])
  );

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationChange}
        onClose={handleWebviewClose}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
