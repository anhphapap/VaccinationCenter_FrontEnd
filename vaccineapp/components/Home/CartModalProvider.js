import React, { createContext, useContext, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Styles from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";

const CartModalContext = createContext();

export const useCartModal = () => useContext(CartModalContext);

export const CartModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const openCart = () => setVisible(true);
  const closeCart = () => setVisible(false);

  const cartItems = [
    {
      id: "vac-xin-qdenga",
      name: "Vắc xin Qdenga",
      price: 1390000,
      disease: "Sốt xuất huyết",
      img: "https://vnvc.vn/wp-content/uploads/2024/09/vaccine-qdenga-1.jpg",
    },
    {
      id: "vac-xin-qdeng",
      name: "Vắc xin Qdenga",
      price: 1390000,
      disease: "Sốt xuất huyết",
      img: "https://vnvc.vn/wp-content/uploads/2024/09/vaccine-qdenga-1.jpg",
    },
    {
      id: "vac-xin-shingrix",
      name: "Vắc xin Shingrix",
      price: 3890000,
      disease: "Zona thần kinh",
      img: "https://vnvc.vn/wp-content/uploads/2023/11/vacxin-shingrix.jpg",
    },
    {
      id: "vac-xin-shingri",
      name: "Vắc xin Shingrix",
      price: 3890000,
      disease: "Zona thần kinh",
      img: "https://vnvc.vn/wp-content/uploads/2023/11/vacxin-shingrix.jpg",
    },
    {
      id: "vac-xin-shingr",
      name: "Vắc xin Shingrix",
      price: 3890000,
      disease: "Zona thần kinh",
      img: "https://vnvc.vn/wp-content/uploads/2023/11/vacxin-shingrix.jpg",
    },
  ];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
            <View>
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
                  style={{
                    height: "86%",
                  }}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Vắc xin đã chọn
                      </Text>
                    </View>
                  }
                  renderItem={({ item }) => (
                    <View style={styles.iContainer}>
                      <View
                        style={[
                          Styles.rowSpaceCenter,
                          { justifyContent: "flex-start" },
                        ]}
                      >
                        <Image
                          source={{ uri: item.img }}
                          resizeMode="cover"
                          style={styles.img}
                        ></Image>
                        <Text
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "500",
                            fontSize: 16,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View style={[Styles.flexRow, { marginVertical: 20 }]}>
                        <Text style={{ fontWeight: "bold" }}>Phòng bệnh: </Text>
                        <Text>{item.disease}</Text>
                      </View>
                      <View style={Styles.rowSpaceCenter}>
                        <Text style={styles.price}>
                          {item.price.toLocaleString()} VNĐ
                        </Text>
                        <TouchableOpacity>
                          <FontAwesome5
                            name="trash"
                            color={"red"}
                            size={16}
                          ></FontAwesome5>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={styles.iBottom}>
              <TouchableOpacity style={styles.closeBtn}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Đăng ký mũi tiêm ({cartItems.length})
                </Text>
              </TouchableOpacity>
            </View>
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
  iContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#c7c8d0",
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 10,
  },
  body: {
    paddingHorizontal: 20,
    overflow: "scroll",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  closeBtn: {
    backgroundColor: "#0a56df",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  img: {
    height: 80,
    width: 160,
    marginRight: 10,
  },
  price: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  iBottom: {
    borderTopWidth: 1,
    borderColor: "#c7c8d0",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
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
