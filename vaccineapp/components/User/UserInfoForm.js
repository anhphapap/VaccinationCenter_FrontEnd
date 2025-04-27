import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DatePicker from "../common/DatePicker";
import GenderPicker from "../common/GenderPicker";
import FloatBottomButton from "../common/FloatBottomButton";
import MyTextInput from "../common/MyTextInput";

const UserInfoForm = ({ title, initData = {}, onSubmit }) => {
  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "white" }}>
      <View style={styles.banner}>
        <View style={styles.ctnAvt}>
          <View>
            <View style={styles.borderAvt}>
              <Image source={{ uri: defaultAvatar }} style={styles.avt}></Image>
            </View>
            <TouchableOpacity style={styles.borderBtnAvt}>
              <FontAwesome5
                name="pen"
                size={10}
                style={styles.btnAvt}
              ></FontAwesome5>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{ padding: 20 }}>
          <View>
            <Text style={styles.label}>Số điện thoại *</Text>
            <MyTextInput title="Số điện thoại" />
          </View>
          <View>
            <Text style={styles.label}>Họ và tên *</Text>
            <View style={Styles.rowSpaceCenter}>
              <MyTextInput title="Họ và tên đệm" width="64%" />
              <MyTextInput title="Tên" width="34%" />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Giới tính *</Text>
            <GenderPicker></GenderPicker>
          </View>
          <View>
            <Text style={styles.label}>Ngày sinh *</Text>
            <View style={Styles.rowSpaceCenter}>
              <DatePicker type="back" />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Địa chỉ *</Text>
            <View style={Styles.rowSpaceCenter}>
              <MyTextInput title="Số nhà, tên đường" />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Email *</Text>
            <View style={Styles.rowSpaceCenter}>
              <MyTextInput title="Email" />
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatBottomButton label={title} icon={"arrow-right"}></FloatBottomButton>
    </View>
  );
};

export default UserInfoForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginBottom: 84,
    marginTop: 50,
  },
  banner: {
    height: 80,
    backgroundColor: color.primary,
    position: "relative",
    zIndex: 10,
  },
  ctnAvt: {
    position: "absolute",
    bottom: -45,
    width: "100%",
    alignItems: "center",
  },
  avt: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  borderAvt: {
    borderWidth: 3,
    borderColor: "white",
    width: 96,
    height: 96,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  btnAvt: {
    backgroundColor: color.primary,
    color: "white",
  },
  borderBtnAvt: {
    borderRadius: 20,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  label: {
    fontWeight: "500",
    marginVertical: 10,
    fontSize: 15,
  },
});
