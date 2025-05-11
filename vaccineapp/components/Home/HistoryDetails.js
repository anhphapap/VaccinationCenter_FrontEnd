import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { color } from "../../styles/Styles";
import FloatBottomButton from "../common/FloatBottomButton";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { Buffer } from "buffer";

const HistoryDetails = ({ route }) => {
  const { data } = route.params;
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const handleDownload = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const res = await authApis(token).get(
        endpoints.userCertificate(user.username, data.id),
        { responseType: "arraybuffer" }
      );

      if (res.status === 200) {
        const fileName = res.headers["content-disposition"]
          .split("filename=")[1]
          .replace(/"/g, "");

        const path = FileSystem.documentDirectory + fileName;

        const arrayBuffer = res.data;
        const base64Data = Buffer.from(arrayBuffer, "binary").toString(
          "base64"
        );

        await FileSystem.writeAsStringAsync(path, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log("File downloaded successfully");

        const uri = await FileSystem.getContentUriAsync(path);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: uri,
          flags: 1,
        });
      } else {
        console.error("Failed to download file", res.data);
      }
    } catch (error) {
      console.error("An error occurred during download", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = {
      header: "Người dùng dịch vụ",
      fields: [
        {
          label: "Họ và tên",
          value: `${user.last_name} ${user.first_name}`.toUpperCase(),
        },
        {
          label: "Ngày sinh",
          value: new Date(user.birth_date).toLocaleDateString("vi-VN"),
        },
        { label: "Mã khách hàng", value: user.id },
        { label: "Số điện thoại", value: user.phone },
        { label: "Địa chỉ", value: user.address },
      ],
    };

    const injectionInfo = {
      header: "Thông tin ngày tiêm",
      fields: [
        {
          label: "Tiêm ngày",
          value:
            data.status === "VACCINATED"
              ? new Date(data.injection_time).toLocaleDateString("vi-VN")
              : "Chưa cập nhập",
        },
        { label: "Trung tâm tiêm", value: "PVVC Nhà Bè" },
        { label: "Địa chỉ", value: "Khu dân cư Nhơn Đức, Nhà Bè, TP.HCM" },
      ],
    };

    const vaccineInfo = {
      header: "Thông tin vắc xin tiêm",
      fields: [
        { label: "Loại vắc xin", value: data.vaccine.name },
        { label: "Mũi tiêm", value: "Mũi " + data.number },
        { label: "Phòng bệnh", value: data.vaccine.disease },
        { label: "Đợt tiêm", value: data.campaign?.name || "Không" },
      ],
    };

    setInfo([userInfo, injectionInfo, vaccineInfo]);
  }, []);

  return (
    info && (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingBottom: data.status === "VACCINATED" ? 100 : 10,
        }}
      >
        <ScrollView>
          {info.map((item, index) => (
            <View key={index}>
              <Text style={styles.header}>{item.header}</Text>
              {item.fields.map((field, i) => (
                <View key={i + field.label} style={styles.field}>
                  <View style={styles.container}>
                    <Text style={styles.label}>{field.label}</Text>
                    <Text style={styles.value}>{field.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        {data.status === "VACCINATED" && (
          <FloatBottomButton
            disabled={loading}
            label={loading ? "Đang tải..." : "Tải chứng chỉ"}
            press={handleDownload}
            icon={"file-download"}
          ></FloatBottomButton>
        )}
      </View>
    )
  );
};

export default HistoryDetails;

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    backgroundColor: color.bg,
    padding: 15,
  },
  field: {
    paddingHorizontal: 15,
  },
  label: {
    color: "gray",
    fontWeight: "500",
  },
  value: {
    fontWeight: "bold",
  },
  container: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: color.border + "50",
    gap: 5,
  },
  pdf: {
    flex: 1,
    width: "100%",
  },
});
