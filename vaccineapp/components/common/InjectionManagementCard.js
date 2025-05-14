import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Styles, { color } from "../../styles/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import { showToast } from "../common/ShowToast";

const InjectionManagementCard = ({ item }) => {
  const [userData, setUserData] = useState(null);
  const [vaccineData, setVaccineData] = useState(null);
  const [campaignData, setCampaignData] = useState(null);

  const loadData = async () => {
    try {
      //   const token = await AsyncStorage.getItem("token");
      //   const resUser = await authApis(token).get(
      //     endpoints.currentUser(item.user)
      //   );
      //   setUserData(resUser.data);

      const resVaccine = await Apis.get(endpoints.vaccineDetails(item.vaccine));
      setVaccineData(resVaccine.data);

      if (item.vaccination_campaign !== 1) {
        const resCampaign = await Apis.get(
          endpoints.campaignDetails(item.vaccination_campaign)
        );
        setCampaignData(resCampaign.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      showToast({
        type: "error",
        text1: "Lỗi khi tải thông tin",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!vaccineData) {
    return <View style={[Styles.ph20, Styles.pv10]}></View>;
  }

  return (
    <TouchableOpacity
      style={[
        Styles.ph20,
        Styles.pv10,
        { borderBottomWidth: 1, borderColor: color.border + "50" },
      ]}
    >
      <View style={[Styles.flexRow, Styles.spaceBetween]}>
        <View style={{ width: "50%" }}>
          <Text style={[Styles.fontBold, { fontSize: 16 }]}>
            {userData?.last_name + " " + userData?.first_name}
          </Text>
          <Text>
            {new Date(item.injection_time).toLocaleDateString("vi-VN")}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={[{ textAlign: "right" }]}>
            {vaccineData?.name} - Mũi {item.number}
          </Text>
          <Text
            style={[
              Styles.fontBold,
              {
                color:
                  item.status === "NOT_VACCINATED"
                    ? color.primary
                    : item.status === "VACCINATED"
                    ? color.primary2
                    : "red",
                textAlign: "right",
                fontSize: 16,
              },
            ]}
          >
            {item.status === "NOT_VACCINATED"
              ? "Chưa tiêm"
              : item.status === "VACCINATED"
              ? "Đã tiêm"
              : "Bỏ lỡ"}
          </Text>
        </View>
      </View>
      <Text>Đợt tiêm: {campaignData?.name || "Không"}</Text>
    </TouchableOpacity>
  );
};

export default InjectionManagementCard;

const styles = StyleSheet.create({});
