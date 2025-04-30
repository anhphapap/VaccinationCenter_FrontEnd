import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DatePicker from "../common/DatePicker";
import GenderPicker from "../common/GenderPicker";
import FloatBottomButton from "../common/FloatBottomButton";
import MyTextInput from "../common/MyTextInput";
import useUser from "../../hooks/useUser";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HelperText } from "react-native-paper";
import LoadingPage from "../common/LoadingOverlay";
import { format, parseISO } from "date-fns";
import { MyDispatchContext } from "../contexts/Contexts";
import { useLoading } from "../contexts/LoadingContext";
import Toast from "react-native-toast-message";

const UserInfoForm = ({ title, onSubmit }) => {
  const currentUser = useUser();
  const [user, setUser] = useState(null);
  const dispatch = useContext(MyDispatchContext);
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    showLoading();
    if (currentUser) {
      setUser({
        ...currentUser,
        gender: currentUser.gender ?? true,
        birth_date: currentUser.birth_date
          ? parseISO(currentUser.birth_date)
          : null,
      });
    }
    hideLoading();
  }, [currentUser]);
  const [msg, setMsg] = useState();
  const nav = useNavigation();

  const info = [
    {
      label: "Số điện thoại",
      field: "phone",
    },
    {
      label: "Họ và tên đệm",
      field: "last_name",
    },
    {
      label: "Tên",
      field: "first_name",
    },
    {
      label: "Giới tính",
      field: "gender",
    },
    {
      label: "Ngày sinh",
      field: "birth_date",
    },
    {
      label: "Địa chỉ",
      field: "adrress",
    },
    {
      label: "Email",
      field: "email",
    },
  ];
  const setState = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  const picker = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permissions denied!");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) setState(result.assets[0].uri, "avatar");
    }
  };

  const validate = () => {
    if (Object.values(user).length === 0) {
      setMsg({ type: "error", msg: "Vui lòng nhập thông tin!" });
      return false;
    }

    for (let i of info)
      if (user[i.field] === null) {
        setMsg({ type: "error", msg: `Vui lòng nhập ${i.label}` });
        return false;
      }

    return true;
  };

  const uploadToCloudinary = async (photo) => {
    const formData = new FormData();

    formData.append("file", {
      uri: photo,
      type: "image/jpeg",
      name: "avatar.jpg",
    });

    formData.append("upload_preset", "vaccine");
    formData.append("cloud_name", "dpmek7kuc");

    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dpmek7kuc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const submit = async () => {
    if (validate() === true) {
      try {
        showLoading();

        let form = new FormData();
        for (let key in user) {
          if (key === "avatar") {
            if (user.avatar !== currentUser.avatar) {
              let avt = await uploadToCloudinary(user.avatar);
              form.append(key, avt);
            } else form.append(key, user.avatar);
          } else if (key === "birth_date") {
            form.append(key, format(new Date(user[key]), "yyyy-MM-dd"));
          } else form.append(key, user[key]);
        }
        form.append("is_completed_profile", true);
        const token = await AsyncStorage.getItem("token");
        let res = await authApis(token).patch(
          endpoints["current-user"](user?.username),
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Toast.show({
          type: "success",
          text1: title + " thành công!",
        });
        dispatch({
          type: "update",
          payload: res.data,
        });
      } catch (ex) {
        setMsg({
          type: "error",
          msg: ex.message,
        });
      } finally {
        hideLoading();
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

  return !user ? (
    <LoadingPage />
  ) : (
    <View style={{ position: "relative", flex: 1, backgroundColor: "white" }}>
      <View style={styles.banner}>
        <View style={styles.ctnAvt}>
          <View>
            <View style={styles.borderAvt}>
              <Image
                source={{
                  uri:
                    user?.avatar === "/static/images/avatar.png"
                      ? defaultAvatar
                      : user?.avatar,
                }}
                style={styles.avt}
              ></Image>
            </View>
            <TouchableOpacity style={styles.borderBtnAvt} onPress={picker}>
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
          <HelperText type="error" visible={msg}>
            {msg}
          </HelperText>
          <View>
            <Text style={styles.label}>Số điện thoại *</Text>
            <MyTextInput
              title="Số điện thoại"
              value={user.phone ? user.phone : ""}
              onChangeText={(text) => setState(text, "phone")}
            />
          </View>
          <View>
            <Text style={styles.label}>Họ và tên *</Text>
            <View style={Styles.rowSpaceCenter}>
              <MyTextInput
                title="Họ và tên đệm"
                width="64%"
                value={user.last_name ? user.last_name : ""}
                onChangeText={(text) => setState(text, "last_name")}
              />
              <MyTextInput
                title="Tên"
                width="34%"
                value={user.first_name ? user.first_name : ""}
                onChangeText={(text) => setState(text, "first_name")}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Giới tính *</Text>
            <GenderPicker
              gender={user.gender}
              setGender={setState}
            ></GenderPicker>
          </View>
          <View>
            <Text style={styles.label}>Ngày sinh *</Text>
            <View style={Styles.rowSpaceCenter}>
              <DatePicker
                type="back"
                date={user.birth_date}
                setDate={(d) => setState(d, "birth_date")}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Địa chỉ *</Text>
            <View style={Styles.rowSpaceCenter}>
              <MyTextInput
                title="Số nhà, tên đường"
                value={user.address !== null ? user.address : ""}
                onChangeText={(text) => setState(text, "address")}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Email *</Text>
            <View style={Styles.rowSpaceCenter}>
              <MyTextInput
                title="Email"
                value={user.email !== null ? user.email : ""}
                onChangeText={(text) => setState(text, "email")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatBottomButton
        label={title}
        icon={"arrow-right"}
        press={submit}
      ></FloatBottomButton>
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
