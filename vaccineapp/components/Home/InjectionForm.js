import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { color } from "../../styles/Styles";
import FloatBottomButton from "../common/FloatBottomButton";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { Buffer } from "buffer";
import { showToast } from "../common/ShowToast";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import UpdateStatusModal from "../common/UpdateStatusModal";
import { useLoading } from "../../contexts/LoadingContext";
import { format } from "date-fns";

const InjectionForm = ({ route, mode = "user" }) => {
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const { data } = route.params;
  const [info, setInfo] = useState();
  const { showLoading, hideLoading } = useLoading();
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (status, note) => {
    try {
      showLoading();
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await authApis(token).patch(endpoints.updateStatus(data.id), {
        injection_time: data.injection_time,
        user: data.user.id,
        vaccination_campaign: data.vaccination_campaign?.id || 1,
        status: status,
        note: note,
      });
      data.status = status;
      data.note = note;
      if (
        data.status === "VACCINATED" &&
        data.vaccine.doses.length > data.number
      ) {
        const d = {
          injection_time: format(
            new Date(
              new Date(data.injection_time).getTime() +
                data.vaccine.doses[data.number].days_after_previous *
                  24 *
                  60 *
                  60 *
                  1000
            ),
            "yyyy-MM-dd"
          ),
          user: data.user.id,
          vaccination_campaign: data.vaccination_campaign?.id || 1,
          vaccine: data.vaccine.id,
          number: data.number + 1,
        };
        let res = await authApis(token).post(endpoints.injections, d, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      setUpdateStatusModal(false);
      if (res.status === 200) {
        showToast({
          text1: "Cập nhập trạng thái thành công",
          type: "success",
        });
      }
    } catch (error) {
      console.error("An error occurred during update status", error);
      showToast({
        text1: "Lỗi khi cập nhập trạng thái",
        type: "error",
      });
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      showLoading();
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const res = await authApis(token).get(
        endpoints.userCertificate(data.user.id, data.id),
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
        showToast({
          text1: "Tải chứng nhận không thành công",
          type: "error",
        });
      }
    } catch (error) {
      console.log("An error occurred during download", error);
      showToast({
        text1: "Có lỗi xảy ra",
        type: "error",
      });
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = {
      header: "Người dùng dịch vụ",
      fields: [
        {
          label: "Họ và tên",
          value: `${data.user.last_name} ${data.user.first_name}`.toUpperCase(),
        },
        {
          label: "Ngày sinh",
          value: new Date(data.user.birth_date).toLocaleDateString("vi-VN"),
        },
        { label: "Mã khách hàng", value: data.user.id },
        { label: "Số điện thoại", value: data.user.phone },
        { label: "Địa chỉ", value: data.user.address },
      ],
    };

    const injectionInfo = {
      header: "Thông tin tiêm chủng",
      fields: [
        {
          label: "Trạng thái",
          value:
            data.status === "VACCINATED"
              ? "Đã tiêm"
              : data.status === "MISSED"
              ? "Bỏ lỡ"
              : "Chưa tiêm",
        },
        {
          label: "Ghi chú sức khỏe",
          value: data.note || "Chưa cập nhập",
        },
        {
          label: "Tiêm ngày",
          value: new Date(data.injection_time).toLocaleDateString("vi-VN"),
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
  }, [data]);

  return (
    info && (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingBottom:
            data.status === "VACCINATED" ||
            (data.status === "NOT_VACCINATED" && mode === "staff")
              ? 90
              : 10,
        }}
      >
        <ScrollView>
          {info.map((item, index) => (
            <View key={index}>
              <View style={styles.header}>
                <Text style={{ fontWeight: "bold" }}>{item.header}</Text>
              </View>
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
            label={loading ? "Đang tải..." : "Tải chứng nhận tiêm "}
            press={handleDownload}
            icon={"file-download"}
          ></FloatBottomButton>
        )}
        {mode === "staff" && data.status !== "VACCINATED" && (
          <FloatBottomButton
            disabled={loading}
            label={loading ? "Đang tải..." : "Cập nhập trạng thái"}
            press={() => setUpdateStatusModal(true)}
            icon={"edit"}
          />
        )}
        {updateStatusModal && (
          <UpdateStatusModal
            visible={updateStatusModal}
            onClose={() => setUpdateStatusModal(false)}
            onUpdate={handleUpdateStatus}
            status={data.status}
            note={data.note}
          />
        )}
      </View>
    )
  );
};

export default InjectionForm;

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.bg,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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
