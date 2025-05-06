import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import MyTextInput from "../common/MyTextInput";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";

const ChangePassword = () => {
  const user = useUser();
  const [curPass, setCurPass] = useState();
  const [newPass, setNewPass] = useState();
  const [loading, setLoading] = useState(false);

  const validate = () => {};

  const changePassword = async () => {
    try {
      setLoading(true);
    } catch (ex) {
      console.error(ex.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[Styles.flex, Styles.bgWhite, Styles.p20]}>
      <View
        style={[Styles.flexRow, Styles.alignCenter, Styles.g10, Styles.pv20]}
      >
        <Image
          source={{ uri: defaultAvatar }}
          resizeMode="cover"
          style={styles.img}
        ></Image>
        <View>
          <Text style={[Styles.uppercase, Styles.fontBold]}>
            {user.last_name + " " + user.first_name}
          </Text>
          <Text style={{ color: "gray" }}>{user.phone}</Text>
        </View>
      </View>
      <Text style={[Styles.fontBold, Styles.fz20, Styles.mv10]}>
        Đổi mật khẩu
      </Text>
      <View>
        <Text style={Styles.mv10}>Mật khẩu hiện tại</Text>
        <View style={Styles.rowSpaceCenter}>
          <MyTextInput
            title={"Mật khẩu hiện tại"}
            secure={true}
            onChangeText={setCurPass}
          />
        </View>
      </View>
      <View>
        <Text style={Styles.mv10}>Mật khẩu mới</Text>
        <View style={Styles.rowSpaceCenter}>
          <MyTextInput
            title={"Mật khẩu mới"}
            secure={true}
            onChangeText={setNewPass}
          />
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.btn}
        labelStyle={{ fontSize: 16 }}
        disabled={loading}
        loading={loading}
        onPress={changePassword}
      >
        Xác nhận
      </Button>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  btn: {
    backgroundColor: color.primary,
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
  },
});
