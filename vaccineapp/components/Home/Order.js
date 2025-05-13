import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Styles, { color, logo } from "../../styles/Styles";
import { Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DatePicker from "../common/DatePicker";
import { useNavigation } from "@react-navigation/native";
import { VaccineContext } from "../../contexts/VaccineContext";
import VaccineCard from "../common/VaccineCard";
import useUser from "../../hooks/useUser";
import { useLoading } from "../../contexts/LoadingContext";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import RenderHTML from "react-native-render-html";
import { showToast } from "../common/ShowToast";
import { format } from "date-fns";

const listInfo = [
  {
    field: "phone",
    label: "Số điện thoại",
  },
  {
    label: "Ngày sinh",
    field: "birth_date",
  },
  {
    label: "Mã khách hàng",
    field: "id",
  },
  {
    label: "Giới tính",
    field: "gender",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "Địa chỉ",
    field: "address",
  },
];

const Order = () => {
  const [date, setDate] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState();
  const { selectedVaccines, removeVaccine, setSelectedVaccines } =
    useContext(VaccineContext);
  const user = useUser();
  const nav = useNavigation();
  const [listCampaign, setListCampaign] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [addMore, setAddMore] = useState(true);
  const [curCampaign, setCurCampaign] = useState();
  const [showInfoCamp, setShowInfoCamp] = useState(false);
  const { width } = useWindowDimensions();

  const loadCampain = async () => {
    try {
      showLoading();
      const token = await AsyncStorage.getItem("token");
      let res = await authApis(token).get(endpoints.campaigns);
      setListCampaign(res.data);
      setSelectedCampaign(res.data[0].id);
    } catch (ex) {
      console.log(ex.response?.data);
    } finally {
      hideLoading();
    }
  };

  const handleSelectCampaign = async () => {
    try {
      showLoading();
      let id = listCampaign.find((item) => item.id === selectedCampaign);
      setCurCampaign(id);
      setAddMore(true);
      if (curCampaign && curCampaign.id !== 1) setSelectedVaccines([]);
      if (!id || id?.id === 1) return;
      let res = await Apis.get(endpoints.vaccineDetails(id.vaccine));
      setSelectedVaccines([res.data]);
      setAddMore(false);
    } catch (ex) {
      console.log(ex);
    } finally {
      hideLoading();
    }
  };

  const validate = () => {
    if (selectedVaccines.length === 0) {
      showToast({ type: "error", text1: "Vui lòng chọn vắc xin" });
      return false;
    }
    if (!date) {
      showToast({ type: "error", text1: "Vui lòng chọn ngày tiêm" });
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!user) {
      nav.navigate("TÀI KHOẢN", {
        screen: "login",
        params: { redirect: "order" },
      });
      return;
    }
    if (validate()) {
      try {
        showLoading();
        const token = await AsyncStorage.getItem("token");
        for (let x of selectedVaccines) {
          const data = {
            injection_time: format(new Date(date), "yyyy-MM-dd"),
            user: user.id,
            vaccination_campaign: selectedCampaign,
            vaccine: x.id,
            number: 1,
          };
          let res = await authApis(token).post(endpoints.injections, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        showToast({
          type: "success",
          text1: "Đặt mua thành công",
        });
        setSelectedCampaign(1);
        setSelectedVaccines([]);
        setDate();
      } catch (ex) {
        showToast({
          type: "error",
          text1:
            ex.response?.data.error || ex.response?.data.vaccination_campaign,
        });
      } finally {
        hideLoading();
      }
    }
  };

  useEffect(() => {
    handleSelectCampaign();
  }, [selectedCampaign]);

  useEffect(() => {
    loadCampain();
  }, []);

  return (
    <View
      style={{
        // position: "relative",
        backgroundColor: "white",
        paddingBottom: 63,
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={Styles.p20}>
        <View style={[styles.container, { marginBottom: 40 }]}>
          <View style={styles.header}>
            <Text
              style={[
                Styles.fontBold,
                Styles.fz16,
                { textTransform: "uppercase" },
              ]}
            >
              {user ? user.last_name + " " + user.first_name : "Khách hàng"}
            </Text>
          </View>
          <View style={Styles.p10}>
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
              <Text style={[{ color: color.primary }, Styles.fontPreBold]}>
                Chi tiết người tiêm{" "}
                <FontAwesome5
                  name={showInfo ? "chevron-up" : "chevron-down"}
                  color={color.primary}
                />
              </Text>
            </TouchableOpacity>
            {user && showInfo && (
              <View style={[{ gap: 10 }, Styles.mv10]}>
                <View style={Styles.rowSpaceCenter}>
                  <Text style={[{ color: "gray" }, Styles.fontPreBold]}>
                    Họ và tên
                  </Text>
                  <Text style={Styles.fontPreBold}>
                    {user.last_name + " " + user.first_name}
                  </Text>
                </View>
                {listInfo.map((item) => (
                  <View style={Styles.rowSpaceCenter} key={item.field}>
                    <Text style={[{ color: "gray" }, Styles.fontPreBold]}>
                      {item.label}
                    </Text>
                    <Text style={Styles.fontPreBold}>
                      {item.field === "gender"
                        ? user[item.field] === true
                          ? "Nam"
                          : "Nữ"
                        : item.field === "birth_date"
                        ? new Date(user[item.field]).toLocaleDateString("vi-VN")
                        : user[item.field]}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <Text style={[Styles.fontPreBold, Styles.mv10, Styles.mt20]}>
              Địa điểm tiêm
            </Text>
            <View
              style={[
                Styles.border1,
                Styles.rounded10,
                Styles.ph10,
                { backgroundColor: color.secondary, paddingVertical: 15 },
              ]}
            >
              <Text style={Styles.fontPreBold}>
                Nhà Bè, Thành phố Hồ Chí Minh
              </Text>
            </View>
            <Text style={[Styles.fontPreBold, Styles.mv10]}>
              Chọn đợt tiêm *
            </Text>
            <View style={{ zIndex: open ? 1000 : 1 }}>
              <DropDownPicker
                open={open}
                value={selectedCampaign}
                items={listCampaign.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                setOpen={setOpen}
                setValue={setSelectedCampaign}
                setItems={setListCampaign}
                placeholder="Chọn đợt tiêm"
                listMode="SCROLLVIEW"
                style={[Styles.rounded10, { borderColor: color.border }]}
                dropDownContainerStyle={{ borderColor: color.border }}
                selectedItemContainerStyle={{
                  backgroundColor: color.border,
                }}
              />
            </View>
            {curCampaign?.id !== 1 && (
              <TouchableOpacity
                onPress={() => setShowInfoCamp(!showInfoCamp)}
                style={Styles.mt10}
              >
                <Text style={[{ color: color.primary }, Styles.fontPreBold]}>
                  Thông tin đợt tiêm{" "}
                  <FontAwesome5
                    name={showInfoCamp ? "chevron-up" : "chevron-down"}
                    color={color.primary}
                  />
                </Text>
              </TouchableOpacity>
            )}
            {showInfoCamp && (
              <View style={Styles.mt10}>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: curCampaign.description }}
                  tagsStyles={{
                    p: {
                      margin: 0,
                      padding: 0,
                      lineHeight: 22,
                    },
                    strong: {
                      fontWeight: "bold",
                    },
                  }}
                ></RenderHTML>
              </View>
            )}
            <Text style={[Styles.fontPreBold, Styles.mv10]}>
              Chọn vắc xin *
            </Text>
            {selectedVaccines.length > 0 ? (
              selectedVaccines.map((item) => (
                <VaccineCard
                  item={item}
                  onTrash={() => removeVaccine(item.id)}
                  key={item.id}
                  btnDel={addMore}
                />
              ))
            ) : (
              <View style={[Styles.alignCenter]}>
                <Image
                  source={{ uri: logo.not_found }}
                  style={styles.imgNotFound}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  Danh sách vắc xin chọn mua trống
                </Text>
              </View>
            )}
            {addMore && (
              <View style={[Styles.rowSpaceCenter, Styles.mv10, { gap: 10 }]}>
                <Button
                  style={styles.btn1}
                  onPress={() => nav.navigate("addFromCart")}
                >
                  <FontAwesome5
                    name="shopping-cart"
                    color={"white"}
                    size={14}
                  ></FontAwesome5>
                  <Text style={[Styles.fontBold, { color: "white" }]}>
                    {" "}
                    Thêm từ giỏ
                  </Text>
                </Button>
                <Button
                  style={styles.btn2}
                  onPress={() => nav.navigate("addVaccines")}
                >
                  <Text style={{ color: "#0a56df" }}>Thêm mới vắc xin</Text>
                </Button>
              </View>
            )}
            <Text style={[Styles.fontPreBold, Styles.mt10]}>
              Chọn ngày mong muốn tiêm *
            </Text>
            <DatePicker
              date={date}
              setDate={setDate}
              type={curCampaign?.id !== 1 ? "custom" : "foward"}
              startDate={new Date(curCampaign?.start_date)}
              endDate={new Date(curCampaign?.end_date)}
            />
          </View>
        </View>
      </ScrollView>

      <View style={[Styles.rowSpaceCenter, styles.footer]}>
        <View>
          <Text style={{ color: "gray" }}>Tổng cộng</Text>
          <Text style={[Styles.fontBold, Styles.fz18]}>
            {Array.isArray(selectedVaccines) && selectedVaccines.length > 0
              ? selectedVaccines
                  .reduce((sum, item) => sum + item.price, 0)
                  .toLocaleString()
              : "0"}{" "}
            VNĐ
          </Text>
        </View>
        <Button style={[styles.btn1, { flex: 0 }]} onPress={handleConfirm}>
          <Text style={[Styles.textWhite, Styles.p10]}>Xác nhận</Text>
        </Button>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 10,
  },
  header: {
    backgroundColor: color.secondary,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: color.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
  },
  iContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 10,
  },
  iBottom: {
    borderTopWidth: 1,
    borderColor: color.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
  },
  img: {
    height: 80,
    width: 160,
    marginRight: 10,
  },
  locate: {
    padding: 10,
  },
  imgNotFound: {
    width: "60%",
    aspectRatio: 1,
  },
  campaign: {
    borderWidth: 2,
    borderColor: color.border,
    borderRadius: 10,
  },
});
