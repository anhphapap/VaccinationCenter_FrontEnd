import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";
import MyTextInput from "../common/MyTextInput";
import { Button, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Apis, { endpoints } from "../../configs/Apis";
import { showToast } from "../common/ShowToast";

const Register = () => {
  const info = [
    {
      label: "Tên đăng nhập",
      field: "username",
      secure: false,
    },
    {
      label: "Mật khẩu",
      field: "password",
      secure: true,
    },
    {
      label: "Xác nhận mật khẩu",
      field: "confirm_password",
      secure: true,
    },
  ];

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const nav = useNavigation();

  const setState = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  const validate = () => {
    if (Object.values(user).length === 0) {
      setMsg({ type: "error", msg: "Vui lòng nhập thông tin!" });
      return false;
    }
    for (let i of info)
      if (!user[i.field]) {
        setMsg({ type: "error", msg: `Vui lòng nhập ${i.label}` });
        return false;
      }

    if (user.password !== user.confirm_password) {
      setMsg({ type: "error", msg: `Mật khẩu không khớp !` });
      return false;
    }
    return true;
  };

  const register = async () => {
    if (validate() === true) {
      try {
        setLoading(true);
        let form = new FormData();
        for (let key in user)
          if (key !== "confirm_password") form.append(key, user[key]);

        let res = await Apis.post(endpoints["register"], form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        showToast({
          type: "success",
          text1: "Đăng ký thành công",
        });

        if (res.status === 201)
          nav.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
      } catch (ex) {
        setMsg({
          type: "error",
          msg: Object.values(ex.response?.data)[0] || ex.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (msg)
      showToast({
        type: msg.type,
        text1: msg.msg,
      });
  }, [msg]);

  return (
    <View style={[Styles.flex, Styles.p20, Styles.bgWhite]}>
      <View style={[Styles.alignCenter, Styles.mt20]}>
        <Image
          source={{ uri: logo.icon_name }}
          style={styles.logo}
          resizeMode="cover"
        ></Image>
      </View>
      {info.map((item) => (
        <View key={item.field}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={Styles.rowSpaceCenter}>
            <MyTextInput
              title={item.label}
              secure={item.secure}
              onChangeText={(t) => setState(t, item.field)}
            />
          </View>
        </View>
      ))}
      <Button
        mode="contained"
        style={styles.btn}
        labelStyle={{ fontSize: 16 }}
        disabled={loading}
        loading={loading}
        onPress={register}
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
  btn: {
    backgroundColor: color.primary,
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
  },
});
