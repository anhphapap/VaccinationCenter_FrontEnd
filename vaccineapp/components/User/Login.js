import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";
import MyTextInput from "../common/MyTextInput";
import { Button, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext } from "../contexts/Contexts";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs";
import Toast from "react-native-toast-message";

const Login = () => {
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
  ];
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(MyDispatchContext);
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
    return true;
  };

  const login = async () => {
    if (validate() === true) {
      try {
        setLoading(true);

        const res = await Apis.post(
          endpoints["login"],
          qs.stringify({
            ...user,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "password",
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        await AsyncStorage.setItem("token", res.data.access_token);
        let u = await authApis(res.data.access_token).get(
          endpoints["current-user"](user.username)
        );
        Toast.show({
          type: "success",
          text1: "Đăng nhập thành công",
        });

        dispatch({
          type: "login",
          payload: u.data,
        });

        if (!u.data.is_completed_profile) {
          nav.reset({
            index: 0,
            routes: [{ name: "registerProfile" }],
          });
        } else {
          nav.reset({
            index: 0,
            routes: [{ name: "TRANG CHỦ" }],
          });
        }
      } catch (ex) {
        console.log(ex.message);
        setMsg({ type: "error", msg: ex.response?.data?.error_description });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (msg)
      Toast.show({
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
        style={[
          {
            backgroundColor: color.primary,
            borderRadius: 10,
            padding: 5,
            marginTop: 20,
          },
        ]}
        labelStyle={{ fontSize: 16 }}
        disabled={loading}
        loading={loading}
        onPress={login}
      >
        Đăng nhập
      </Button>
      <View style={[Styles.flexRow, Styles.flexCenter, Styles.mt10]}>
        <Text style={Styles.fz16}>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => nav.navigate("register")}>
          <Text style={[Styles.fontBold, Styles.underline, Styles.fz16]}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
