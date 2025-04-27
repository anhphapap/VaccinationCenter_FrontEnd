import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Styles, { color, logo } from "../../styles/Styles";
import MyTextInput from "../common/MyTextInput";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const nav = useNavigation();
  return (
    <View style={[Styles.flex, Styles.p20, Styles.bgWhite]}>
      <View style={[Styles.alignCenter, Styles.mt20]}>
        <Image
          source={{ uri: logo.icon_name }}
          style={styles.logo}
          resizeMode="cover"
        ></Image>
      </View>
      <View>
        <Text style={styles.label}>Tên đăng nhập</Text>
        <View style={Styles.rowSpaceCenter}>
          <MyTextInput title="Tên đăng nhập" />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Mật khẩu</Text>
        <View style={Styles.rowSpaceCenter}>
          <MyTextInput title="Mật khẩu" secure />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View style={Styles.rowSpaceCenter}>
          <MyTextInput title="Xác nhận mật khẩu" secure />
        </View>
      </View>
      <Button
        mode="contained"
        style={[
          {
            backgroundColor: color.primary,
            borderRadius: 10,
            padding: 5,
            marginTop: 20,
          },
        ]}
        labelStyle={{ fontSize: 16 }}
      >
        Đăng ký
      </Button>
      <View style={[Styles.flexRow, Styles.flexCenter, Styles.mt10]}>
        <Text style={Styles.fz16}>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => nav.navigate("login")}>
          <Text style={[Styles.fontBold, Styles.underline, Styles.fz16]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  label: {
    fontWeight: "500",
    marginVertical: 10,
    fontSize: 15,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
