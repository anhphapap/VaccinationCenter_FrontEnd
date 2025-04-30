import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import FloatBottomButton from "../common/FloatBottomButton";
import VaccineCard from "../common/VaccineCard";
import { useLoading } from "./LoadingContext";

const CartModalContext = createContext();

export const useCartModal = () => useContext(CartModalContext);

export const CartModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const openCart = () => setVisible(true);
  const closeCart = () => setVisible(false);

  const loadItem = async () => {
    showLoading();
    let res = await Apis.get(endpoints.vaccines);
    setCartItems(res.data.results);
    hideLoading();
  };

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <CartModalContext.Provider value={{ openCart, closeCart }}>
      {children}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={closeCart}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.overlayTouchable} onPress={closeCart} />
          <View style={styles.modalContainer}>
            <View
              style={[
                Styles.rowSpaceCenter,
                {
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderColor: "#c7c8d0",
                  paddingRight: 10,
                  paddingLeft: 20,
                },
              ]}
            >
              <Text style={styles.title}>Danh sách vắc xin chọn mua</Text>
              <Button mode="text" onPress={closeCart} textColor="black">
                Đóng
              </Button>
            </View>
            <View style={styles.body}>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      Vắc xin đã chọn
                    </Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <VaccineCard
                    btnDel
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    disease={item.disease}
                  ></VaccineCard>
                )}
              />
            </View>
            <FloatBottomButton
              label={`Đăng ký mũi tiêm (${cartItems.length})`}
            ></FloatBottomButton>
          </View>
        </View>
      </Modal>
    </CartModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
    position: "relative",
  },

  body: {
    paddingHorizontal: 20,
    overflow: "scroll",
    flex: 1,
  },
  modalContainer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
    // flex: 1,
    paddingBottom: 100,
    height: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  overlayTouchable: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
});
