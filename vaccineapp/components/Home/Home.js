import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button } from "react-native-paper";
import Styles, { color } from "../../styles/Styles";
import Carousel from "./Carousel";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useCartModal } from "./CartModalProvider";

const Home = () => {
  const { openCart } = useCartModal();
  const nav = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={{
          uri: "https://vnvc.vn/wp-content/themes/wg/images/header_thong_tin_san_pham_vacxin.jpg",
        }}
        style={styles.bgBanner}
        resizeMode="cover"
      />
      <View style={Styles.container}>
        <View
          style={[Styles.rowSpaceCenter, { paddingLeft: 10, marginTop: 10 }]}
        >
          <View style={Styles.flexRow}>
            <View style={{ marginRight: 10 }}>
              <Avatar.Text
                size={40}
                label="AP"
                color="blue"
                style={{ backgroundColor: "white" }}
              />
            </View>
            <View style={Styles.flexCol}>
              <Text style={Styles.textWhite}>Xin chào,</Text>
              <Text style={[Styles.textWhite, { fontWeight: "bold" }]}>
                PHẠM ANH PHA
              </Text>
            </View>
          </View>
          <Button onPress={openCart}>
            <FontAwesome5
              name="shopping-cart"
              color="white"
              size={24}
            ></FontAwesome5>
          </Button>
        </View>
        <View style={{ height: 200, marginTop: 30 }}>
          <Carousel></Carousel>
        </View>
        <View style={[Styles.flexCol, { marginTop: 20, gap: 20 }]}>
          <View style={[Styles.flexRow, { justifyContent: "space-around" }]}>
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => nav.navigate("book")}
              >
                <FontAwesome5
                  name="calendar"
                  size={40}
                  color="blue"
                ></FontAwesome5>
              </TouchableOpacity>
              <Text style={styles.txt}>Đặt lịch</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => nav.navigate("history")}
              >
                <FontAwesome5
                  name="history"
                  size={40}
                  color="blue"
                ></FontAwesome5>
              </TouchableOpacity>
              <Text style={styles.txt}>Lịch sử tiêm chủng</Text>
            </View>
          </View>
          <View style={[Styles.flexRow, { justifyContent: "space-around" }]}>
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => nav.navigate("vaccine")}
              >
                <FontAwesome5 name="list" size={40} color="blue"></FontAwesome5>
              </TouchableOpacity>
              <Text style={styles.txt}>Danh mục vắc xin</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => nav.navigate("order")}
              >
                <FontAwesome5
                  name="syringe"
                  size={40}
                  color="blue"
                ></FontAwesome5>
              </TouchableOpacity>
              <Text style={styles.txt}>Đặt mua vắc xin</Text>
            </View>
          </View>
        </View>
        <View style={styles.adrsContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
            }}
            style={styles.adrsImg}
            resizeMode="cover"
          ></Image>
          <View>
            <Text style={Styles.fontBold}>Trụ sở chính</Text>
            <Text style={{ color: "gray" }}>Nhà Bè, Thành phố Hồ Chí Minh</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  adrsContainer: {
    marginTop: 20,
    flexDirection: "row",
    padding: 20,
    backgroundColor: color.secondary,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  adrsImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  bgBanner: {
    position: "absolute",
    left: "-10%",
    top: 0,
    width: "120%",
    height: 220,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  btn: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: color.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    width: 80,
    fontWeight: "300",
  },
});
