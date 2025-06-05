import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Styles, { color } from "../../styles/Styles";
import { MyDispatchContext } from "../../contexts/Contexts";
import { showToast } from "../common/ShowToast";
import useUser from "../../hooks/useUser";

const VerifyEmail = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [emailVerified, setEmailVerified] = useState(false);
  const navigation = useNavigation();
  const dispatch = useContext(MyDispatchContext);
  const currentUser = useUser();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const checkEmailVerification = setInterval(async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const res = await authApis(token).get(endpoints.currentUser);
        if (res.data.email_verified) {
          dispatch({ type: "update", payload: res.data });
          showToast({
            type: "success",
            text1: "Xác nhận email thành công!",
          });
          setEmailVerified(true);
          clearInterval(timer);
          clearInterval(checkEmailVerification);
        }
      } catch (error) {
        console.log("API Error:", error);
      }
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(checkEmailVerification);
    }

    return () => {
      clearInterval(timer);
      clearInterval(checkEmailVerification);
    };
  }, [timeLeft]);

  const handleResendEmail = async () => {
    const token = await AsyncStorage.getItem("token");
    let form = new FormData();
    form.append("email", currentUser?.email);
    let res = await authApis(token).patch(
      endpoints.user(currentUser?.id),
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    showToast({
      type: "success",
      text1: "Email đã được gửi lại!",
    });
    setTimeLeft(300);
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center", gap: 10 }}>
      {timeLeft > 0 ? (
        <>
          <FontAwesome5
            name="envelope"
            size={80}
            color={color.primary}
            solid
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}
          >
            Xác nhận địa chỉ email của bạn
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Chúng tôi đã gửi link xác nhận đến email của bạn.
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Vui lòng kiểm tra email của bạn và nhấn vào link xác nhận để hoàn
            tất quá trình đăng ký.
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Nếu bạn không nhận được email, vui lòng kiểm tra thư rác.
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
          >
            Thời gian xác nhận: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </Text>
        </>
      ) : (
        <></>
      )}
      {!emailVerified && timeLeft <= 0 ? (
        <>
          <FontAwesome5
            name="times-circle"
            size={100}
            color="red"
            style={{ marginBottom: 20, alignSelf: "center" }}
          />
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
          >
            Xác nhận email thất bại. Vui lòng thử lại.
          </Text>
          <View style={[Styles.rowSpaceCenter, Styles.mt20, { gap: 10 }]}>
            <Button style={styles.btn1} onPress={handleResendEmail}>
              <FontAwesome5
                name="envelope"
                color={"white"}
                size={14}
                solid
              ></FontAwesome5>
              <Text style={[Styles.fontBold, { color: "white" }]}>
                {" "}
                Gửi lại email
              </Text>
            </Button>
            <Button style={styles.btn2} onPress={() => navigation.goBack()}>
              <Text style={{ color: "#0a56df" }}>Trở về</Text>
            </Button>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  btn1: {
    backgroundColor: color.primary,
    borderRadius: 10,
    flex: 1,
  },
  btn2: {
    borderColor: color.primary,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
});
