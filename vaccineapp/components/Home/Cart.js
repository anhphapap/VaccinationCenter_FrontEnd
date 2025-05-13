import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import FloatBottomButton from "../common/FloatBottomButton";
import VaccineCard from "../common/VaccineCard";
import { useLoading } from "../../contexts/LoadingContext";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../contexts/CartContext";
import NoneVaccine from "../common/NoneVaccine";
import { VaccineContext } from "../../contexts/VaccineContext";
import Toast from "react-native-toast-message";
const Cart = ({ addMode = false }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();
  const { selectedVaccines, addVaccine } = useContext(VaccineContext);
  const [preSelect, setPreSelect] = useState(selectedVaccines);
  const handlePreSelect = (item, selected) => {
    if (!selected) {
      if (preSelect.length >= 3) {
        Toast.show({
          text1: "Một người tiêm chỉ được chọn tối đa 3 vắc xin lẻ",
          type: "info",
        });
      } else setPreSelect([...preSelect, item]);
    } else {
      setPreSelect(preSelect.filter((v) => v.id !== item.id));
    }
  };
  const handleConfirm = () => {
    if (addMode) {
      addVaccine(preSelect);
      navigation.goBack();
    } else {
      if (cartItems.length === 0) {
        navigation.goBack();
      } else {
        navigation.navigate("order");
      }
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable
        style={styles.overlayTouchable}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={[Styles.rowSpaceCenter, styles.header]}>
          <Text style={styles.title}>
            {addMode ? "Chọn từ giỏ hàng" : "Danh sách vắc xin chọn mua"}
          </Text>
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
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 110,
          }}
          renderItem={({ item }) => (
            <VaccineCard
              btnDel={!addMode}
              btnCheck={addMode}
              item={item}
              nav={() =>
                navigation.navigate("vaccineDetails", { vaccineId: item.id })
              }
              onTrash={() => removeFromCart(item.id)}
              select={handlePreSelect}
              selected={preSelect.some((v) => v.id === item.id)}
            />
          )}
          ListEmptyComponent={
            <NoneVaccine title="Không có vắc xin nào trong giỏ hàng"></NoneVaccine>
          }
        />

        <FloatBottomButton
          disabled={addMode && selectedVaccines.length === 0}
          label={
            addMode
              ? `Xác nhận ${
                  preSelect.length ? "(" + preSelect.length + ")" : ""
                }`
              : cartItems.length === 0
              ? "Thêm vắc xin"
              : `Đăng ký mũi tiêm (${cartItems.length})`
          }
          press={handleConfirm}
        />
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
