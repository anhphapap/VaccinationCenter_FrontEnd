import React, { createContext, useContext, useEffect, useState } from "react";
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
import Styles, { color } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";

const CartModalContext = createContext();

export const useCartModal = () => useContext(CartModalContext);

export const CartModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openCart = () => setVisible(true);
  const closeCart = () => setVisible(false);

  const loadItem = async () => {
    let res = await Apis.get(endpoints.vaccines);
    setCartItems(res.data.results);
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
                  <View style={styles.iContainer}>
                    <View
                      style={[
                        Styles.rowSpaceCenter,
                        { justifyContent: "flex-start" },
                      ]}
                    >
                      <Image
                        source={{ uri: item.image }}
                        resizeMode="cover"
                        style={styles.img}
                      ></Image>
                      <View style={{ flexShrink: 1 }}>
                        <Text
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "500",
                            fontSize: 16,
                            flexWrap: "wrap",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <View style={[Styles.flexRow, { marginVertical: 20 }]}>
                      <Text style={{ fontWeight: "bold" }}>Phòng bệnh: </Text>
                      <Text>...</Text>
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
    borderColor: color.border,
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 10,
  },
  body: {
    paddingHorizontal: 20,
    overflow: "scroll",
  },
  modalContainer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 140,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  closeBtn: {
    backgroundColor: color.primary,
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
    color: color.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  iBottom: {
    borderTopWidth: 1,
    borderColor: color.border,
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
