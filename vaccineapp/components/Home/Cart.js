import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import FloatBottomButton from "../common/FloatBottomButton";
import VaccineCard from "../common/VaccineCard";
import { useLoading } from "../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation();

  const loadItem = async () => {
    showLoading();
    try {
      const res = await Apis.get(endpoints.vaccines);
      setCartItems(res.data.results);
    } catch (err) {
      console.error(err);
    }
    hideLoading();
  };

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <View style={styles.overlay}>
      <Pressable
        style={styles.overlayTouchable}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={[Styles.rowSpaceCenter, styles.header]}>
          <Text style={styles.title}>Danh sách vắc xin chọn mua</Text>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            textColor="black"
          >
            Đóng
          </Button>
        </View>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Vắc xin đã chọn
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          renderItem={({ item }) => (
            <VaccineCard
              btnDel
              item={item}
              nav={() =>
                navigation.navigate("vaccineDetails", { vaccineId: item.id })
              }
            />
          )}
        />

        <FloatBottomButton label={`Đăng ký mũi tiêm (${cartItems.length})`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
    position: "relative",
  },
  overlayTouchable: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  container: {
    // flex: 1,
    backgroundColor: color.white,
    height: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#c7c8d0",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Cart;
