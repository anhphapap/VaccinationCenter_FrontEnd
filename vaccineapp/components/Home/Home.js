import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import Styles from "../../styles/Styles";
import Carousel from "./Carousel";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={{
          uri: "https://vnvc.vn/wp-content/themes/wg/images/header_thong_tin_san_pham_vacxin.jpg",
        }}
        style={styles.bgBanner}
        resizeMode="cover"
      />
      <View style={Styles.container}>
        <View style={[Styles.rowSpaceCenter, { paddingHorizontal: 10 }]}>
          <View style={Styles.flexRow}>
            <View style={{ marginHorizontal: 10 }}>
              <Avatar.Text
                size={40}
                label="AP"
                color="blue"
                style={{ backgroundColor: "white" }}
              />
            </View>
            <View style={Styles.flexCol}>
              <Text style={Styles.textWhite}>Xin chào,</Text>
              <Text style={Styles.textWhite}>PHẠM ANH PHA</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => nav.navigate("cart")}>
            <FontAwesome5
              name="shopping-cart"
              color="white"
              size={24}
            ></FontAwesome5>
          </TouchableOpacity>
        </View>
        <View style={{ height: 200, marginTop: 20 }}>
          <Carousel></Carousel>
        </View>
        <View style={[Styles.flexCol, { marginTop: 50 }]}>
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
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  bgBanner: {
    position: "absolute",
    left: "-10%",
    top: 0,
    width: "120%",
    height: 250,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  btn: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#e2e5fc",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    width: 80,
  },
});
