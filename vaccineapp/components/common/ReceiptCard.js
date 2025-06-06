import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useLoading } from "../../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "./ShowToast";
const ReceiptCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const loadData = async () => {
    setLoading(true);
    for (const vaccine of item.order_details) {
      const response = await Apis.get(
        endpoints.vaccineDetails(vaccine.vaccine)
      );
      setData((prev) => [...prev, response.data]);
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      let orderId = Date.now().toString();
      let res = await authApis(token).patch(endpoints.payment, {
        id: item.id,
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
      showToast({
        message: "Có lỗi xảy ra, vui lòng thử lại",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={[Styles.bgWhite, Styles.rounded10, Styles.p10, Styles.mb10]}>
      <View style={[Styles.flexRow, Styles.spaceBetween]}>
        <View style={[Styles.flexRow, Styles.alignCenter]}>
          <Image
            source={{ uri: logo.icon }}
            style={{ width: 20, aspectRatio: 1, marginRight: 5 }}
          />
          <Text style={Styles.fontPreBold}>
            {new Date(item.created_date).toLocaleDateString("vi-VN")}
          </Text>
        </View>
        <Text
          style={[
            Styles.fontPreBold,
            {
              color:
                item.vnp_ResponseCode === "00" ? color.primary2 : color.primary,
            },
          ]}
        >
          {item.vnp_ResponseCode === "00" ? "Đã thanh toán" : "Chưa thanh toán"}
        </Text>
      </View>
      <View style={[Styles.g20, Styles.mv20]}>
        {!loading ? (
          <>
            {(show ? data : data.slice(0, 1)).map((item, index) => (
              <TouchableOpacity
                style={[Styles.flexRow, Styles.g10]}
                key={index}
                onPress={() => {
                  nav.navigate("vaccineDetails", {
                    vaccineId: item.id,
                  });
                }}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{ height: 80, aspectRatio: 2 }}
                />
                <View style={[Styles.flex, Styles.spaceBetween]}>
                  <View>
                    <Text style={Styles.fontPreBold}>{item.name}</Text>
                    <Text style={{ color: "gray" }}>
                      Phòng bệnh: {item.disease}
                    </Text>
                  </View>
                  <Text style={[{ alignSelf: "flex-end" }]}>
                    {item.price.toLocaleString()}đ
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={[Styles.flexRow, Styles.g10]}>
            <View
              style={{
                height: 80,
                aspectRatio: 2,
                backgroundColor: "gray",
                borderRadius: 10,
              }}
            ></View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  height: 14,
                  width: 100,
                  backgroundColor: "gray",
                  borderRadius: 10,
                }}
              ></View>
              <View
                style={{
                  height: 14,
                  width: 150,
                  backgroundColor: "gray",
                  borderRadius: 10,
                }}
              ></View>
            </View>
          </View>
        )}
        {data.length > 1 && !show && (
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text
              style={[
                Styles.fontPreBold,
                { color: "gray", alignSelf: "center" },
              ]}
            >
              Xem thêm{" "}
              <FontAwesome5 name="chevron-down" size={12} color="gray" />
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={[
          Styles.flexRow,
          item.vnp_ResponseCode !== "00" ? Styles.spaceBetween : Styles.flexEnd,
          Styles.alignCenter,
        ]}
      >
        {item.vnp_ResponseCode !== "00" && (
          <Button style={styles.btn2} onPress={handlePayment}>
            <Text style={{ color: "white" }}>Thanh toán</Text>
          </Button>
        )}
        <Text style={[Styles.fontBold]}>
          Tổng cộng: {item.amount.toLocaleString()}đ
        </Text>
      </View>
    </View>
  );
};

export default ReceiptCard;

const styles = StyleSheet.create({
  btn2: {
    fontWeight: "bold",
    borderRadius: 10,
    backgroundColor: color.primary,
  },
});
