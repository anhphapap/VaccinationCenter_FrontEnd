import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import Apis, { endpoints } from "../../configs/Apis";
import Styles, { color } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import RenderHTML from "react-native-render-html";

const listInfo = [
  {
    field: "origin",
    title: "Nguồn gốc",
  },
  {
    field: "injection",
    title: "Đường tiêm",
  },
  {
    field: "recommend",
    title: "Chống chỉ định",
  },
  {
    field: "manual",
    title: "Thận trọng khi sử dụng",
  },
  {
    field: "preserve",
    title: "Bảo quản",
  },
  {
    field: "patient",
    title: "Đối tượng",
  },
  {
    field: "effect",
    title: "Phản ứng sau tiêm",
  },
];

const VaccineDetails = ({ route }) => {
  const [vaccine, setVaccine] = useState();
  const vaccineId = route.params?.vaccineId;
  const { showLoading, hideLoading } = useLoading();
  const { width } = useWindowDimensions();

  const loadData = async () => {
    showLoading();
    let res = await Apis.get(endpoints.vaccineDetails(vaccineId));
    setVaccine(res.data);
    hideLoading();
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    vaccine && (
      <ScrollView style={[Styles.ph20, Styles.bgWhite]}>
        <View style={Styles.alignCenter}>
          <Image
            source={{ uri: vaccine.image }}
            resizeMode="cover"
            style={styles.banner}
          ></Image>
        </View>
        <Text
          style={[
            Styles.fontBold,
            Styles.mt20,
            { textTransform: "uppercase", fontSize: 24 },
          ]}
        >
          {vaccine.name}
        </Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Còn hàng</Text>
        </View>
        <View style={[Styles.flexRow, { marginVertical: 3 }]}>
          <Text style={Styles.fontBold}>Nguồn gốc: </Text>
          <Text>{vaccine.country}</Text>
        </View>
        <View style={[Styles.flexRow, Styles.wrap, { marginVertical: 3 }]}>
          <Text style={Styles.fontBold}>Phòng bệnh: </Text>
          <Text>{vaccine.disease}</Text>
        </View>
        <Text
          style={{
            color: color.primary,
            fontSize: 24,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {vaccine.price.toLocaleString() + " VNĐ"}
        </Text>
        <View style={[Styles.rowSpaceCenter, Styles.mv10, { gap: 10 }]}>
          <Button style={styles.btn1}>
            <FontAwesome5
              name="shopping-cart"
              color={"white"}
              size={14}
            ></FontAwesome5>
            <Text style={[Styles.fontBold, { color: "white" }]}>
              {" "}
              Thêm vào giỏ
            </Text>
          </Button>
          <Button style={styles.btn2}>
            <Text style={{ color: "#0a56df" }}>Mua ngay</Text>
          </Button>
        </View>
        <RenderHTML
          contentWidth={width}
          source={{ html: vaccine.description }}
        ></RenderHTML>
        <View style={Styles.mb20}>
          <Image source={{ uri: vaccine.image }} style={styles.img}></Image>
        </View>
        {listInfo.map(
          (item) =>
            vaccine[item.field] && (
              <View key={item.field}>
                <Text style={[Styles.fontBold, Styles.fz16, { color: "gray" }]}>
                  {item.title}
                </Text>
                <RenderHTML
                  contentWidth={width}
                  source={{ html: vaccine[item.field] }}
                ></RenderHTML>
              </View>
            )
        )}
      </ScrollView>
    )
  );
};

export default VaccineDetails;

const styles = StyleSheet.create({
  banner: {
    width: "80%",
    aspectRatio: 2,
  },
  img: {
    width: "100%",
    aspectRatio: 2,
  },
  statusBox: {
    alignSelf: "flex-start",
    backgroundColor: "#04a44b",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  statusText: {
    color: "white",
    fontWeight: "500",
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
});
