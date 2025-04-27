import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Styles, { color } from "../../styles/Styles";
import { Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { addDays } from "date-fns";
import DatePicker from "../common/DatePicker";

const cartItems = [
  {
    id: "vac-xin-qdenga",
    name: "Vắc xin Qdenga",
    price: 1390000,
    disease: "Sốt xuất huyết",
    img: "https://vnvc.vn/wp-content/uploads/2024/09/vaccine-qdenga-1.jpg",
  },
  {
    id: "vac-xin-shingrix",
    name: "Vắc xin Shingrix",
    price: 3890000,
    disease: "Zona thần kinh",
    img: "https://vnvc.vn/wp-content/uploads/2023/11/vacxin-shingrix.jpg",
  },
];

const user = {
  name: "Phạm Anh Pha",
  phone: "0912195113",
  birth: "17/09/2004",
  id: "1",
  sex: "Nam",
  email: "anhphapap0@gmail.com",
  address: "Bình Định",
};

const listInfo = [
  {
    field: "name",
    label: "Họ và tên",
  },
  {
    field: "phone",
    label: "Số điện thoại",
  },
  {
    label: "Ngày sinh",
    field: "birth",
  },
  {
    label: "Mã khách hàng",
    field: "id",
  },
  {
    label: "Giới tính",
    field: "sex",
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

  return (
    <View
      style={{
        position: "relative",
        backgroundColor: "white",
        paddingBottom: 63,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={Styles.p20}>
        <View style={[styles.container, { marginBottom: 40 }]}>
          <View style={styles.header}>
            <Text style={[Styles.fontBold, Styles.fz16]}>PHẠM ANH PHA</Text>
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
            {showInfo && (
              <View style={[{ gap: 10 }, Styles.mv10]}>
                {listInfo.map((item) => (
                  <View style={Styles.rowSpaceCenter} key={item.field}>
                    <Text style={[{ color: "gray" }, Styles.fontPreBold]}>
                      {item.label}
                    </Text>
                    <Text style={Styles.fontPreBold}>{user[item.field]}</Text>
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
                Styles.p10,
                { backgroundColor: color.secondary },
              ]}
            >
              <Text style={Styles.fontPreBold}>
                Nhà Bè, Thành phố Hồ Chí Minh
              </Text>
            </View>
            <Text style={[Styles.fontPreBold, Styles.mv10]}>
              Chọn vắc xin *
            </Text>
            {cartItems.map((item) => (
              <View style={styles.iContainer} key={item.id}>
                <View
                  style={[
                    Styles.rowSpaceCenter,
                    { justifyContent: "flex-start" },
                  ]}
                >
                  <Image
                    source={{ uri: item.img }}
                    resizeMode="cover"
                    style={styles.img}
                  ></Image>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={[Styles.flexRow, Styles.mv20]}>
                  <Text style={{ fontWeight: "bold" }}>Phòng bệnh: </Text>
                  <Text>{item.disease}</Text>
                </View>
                <View style={Styles.rowSpaceCenter}>
                  <Text style={styles.price}>
                    {item.price.toLocaleString()} VNĐ
                  </Text>
                  <TouchableOpacity>
                    <FontAwesome5
                      name="trash"
                      color={"red"}
                      size={16}
                    ></FontAwesome5>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={[Styles.rowSpaceCenter, Styles.mv10, { gap: 10 }]}>
              <Button style={styles.btn1}>
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
              <Button style={styles.btn2}>
                <Text style={{ color: "#0a56df" }}>Thêm mới vắc xin</Text>
              </Button>
            </View>
            <Text style={[Styles.fontPreBold, Styles.mt10]}>
              Chọn ngày mong muốn tiêm *
            </Text>
            <DatePicker date={date} setDate={setDate} />
          </View>
        </View>
      </ScrollView>
      <View style={[Styles.rowSpaceCenter, styles.footer]}>
        <View>
          <Text style={{ color: "gray" }}>Tổng cộng</Text>
          <Text style={[Styles.fontBold, Styles.fz18]}>0 VNĐ</Text>
        </View>
        <Button style={[styles.btn1, { flex: 0 }]}>
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
});
