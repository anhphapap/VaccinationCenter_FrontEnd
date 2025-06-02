import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import useUser from "../../hooks/useUser";
import { useContext } from "react";
import { MyDispatchContext } from "../../contexts/Contexts";

const Profile = () => {
  const user = useUser();
  const nav = useNavigation();
  const dispatch = useContext(MyDispatchContext);
  const handleLogout = () => {
    dispatch({
      type: "logout",
    });
    nav.reset({
      index: 0,
      routes: [{ name: "TRANG CHỦ" }],
    });
  };

  const handleEdit = () => {
    nav.navigate("profileSetting");
  };

  const handleChangePass = () => {
    nav.navigate("changePassword");
  };

  const listAdvance = [
    { icon: "edit", label: "Chỉnh sửa tài khoản", press: handleEdit },
    { icon: "lock", label: "Đổi mật khẩu", press: handleChangePass },
    { icon: "sign-out-alt", label: "Đăng xuất", press: handleLogout },
  ];

  const listContact = [
    {
      image:
        "https://cdn.nhansu.vn/uploads/images/0E835419/logo/2018-12/1512629823_logov-fa-03.png",
      label: "Tiêm chủng VNVC",
      phone: "028 7102 6595",
    },
    {
      image:
        "https://cdn.haitrieu.com/wp-content/uploads/2022/08/logo-benh-vien-tam-anh.png",
      label: "Trâm Anh TP.HCM",
      phone: "0287 102 6789",
    },
    {
      image:
        "https://cdn.haitrieu.com/wp-content/uploads/2022/08/logo-benh-vien-tam-anh.png",
      label: "Trâm Anh Hà Nội",
      phone: "024 38723872",
    },
    {
      image: "https://nutrihome.vn/wp-content/uploads/2022/09/logo.png",
      label: "Nutrihome",
      phone: "1900 633 599",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Logo_c%C3%B4ng_ty_c%E1%BB%95_ph%E1%BA%A7n_d%C6%B0%E1%BB%A3c_ph%E1%BA%A9m_eco.svg/960px-Logo_c%C3%B4ng_ty_c%E1%BB%95_ph%E1%BA%A7n_d%C6%B0%E1%BB%A3c_ph%E1%BA%A9m_eco.svg.png",
      label: "Eco Pharma",
      phone: "1800 556 889",
    },
  ];

  const listPolicy = [
    { icon: "newspaper", label: "Điều khoản dịch vụ" },
    { icon: "shield-alt", label: "Chính sách quyền riêng tư" },
  ];

  return (
    <View style={Styles.flex}>
      <Image
        style={styles.bg}
        resizeMode="cover"
        source={{
          uri: "https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg",
        }}
      ></Image>
      <View
        style={[
          Styles.flexRow,
          Styles.alignCenter,
          Styles.g20,
          Styles.p20,
          { height: 200 },
        ]}
      >
        <View style={styles.borderAvt}>
          <Image
            source={{
              uri: user?.avatar || defaultAvatar,
            }}
            resizeMode="cover"
            style={styles.avt}
          ></Image>
        </View>
        {user ? (
          <View>
            <Text
              style={[
                Styles.textWhite,
                Styles.fz18,
                Styles.fontBold,
                { textTransform: "uppercase" },
              ]}
            >
              {user.last_name + " " + user.first_name}
            </Text>
            <Text style={Styles.textWhite}>
              {user.phone} - {user.gender ? "Nam" : "Nữ"},{" "}
              {new Date(user.birth_date).toLocaleDateString("vi-VN")}
            </Text>
          </View>
        ) : (
          <View style={[Styles.flexRow, Styles.g20]}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => nav.navigate("login")}
            >
              <Text style={[{ color: color.primary }, Styles.fontBold]}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn2]}
              onPress={() => nav.navigate("register")}
            >
              <Text style={[Styles.textWhite, Styles.fontBold]}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {user && (
        <View>
          {listAdvance.map((item) => (
            <TouchableOpacity
              style={[
                Styles.flexRow,
                Styles.spaceBetween,
                Styles.alignCenter,
                Styles.ph20,
                Styles.pv10,
                Styles.bgWhite,
                {
                  borderBottomWidth: 1,
                  borderColor: color.border,
                },
              ]}
              key={item.label}
              onPress={item.press}
            >
              <View style={[Styles.flexRow, Styles.alignCenter]}>
                <FontAwesome5
                  name={item.icon}
                  color={color.primary}
                  solid
                  size={20}
                  style={[
                    Styles.mr20,
                    Styles.alignCenter,
                    { width: 25, height: 22 },
                  ]}
                ></FontAwesome5>
                <Text style={Styles.fontPreBold}>{item.label}</Text>
              </View>
              <FontAwesome5
                name={"chevron-right"}
                color={"gray"}
                solid
                size={15}
              ></FontAwesome5>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={[Styles.fontBold, Styles.mt10, Styles.ph20, Styles.pv10]}>
        Thông tin liên hệ
      </Text>
      <View>
        {listContact.map((item) => (
          <TouchableOpacity
            style={[
              Styles.flexRow,
              Styles.spaceBetween,
              Styles.alignCenter,
              Styles.ph20,
              Styles.pv10,
              Styles.bgWhite,
              {
                borderBottomWidth: 1,
                borderColor: color.border,
              },
            ]}
            key={item.label}
          >
            <View style={[Styles.flexRow, Styles.alignCenter]}>
              <Image
                source={{ uri: item.image }}
                style={styles.logo}
                resizeMode="cover"
              ></Image>
              <Text style={Styles.fontPreBold}>{item.label}</Text>
            </View>
            <Text style={[Styles.fontBold, { color: color.primary }]}>
              {item.phone}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[Styles.fontBold, Styles.mt10, Styles.ph20, Styles.pv10]}>
        Thông tin chính sách
      </Text>
      <View>
        {listPolicy.map((item) => (
          <TouchableOpacity
            style={[
              Styles.flexRow,
              Styles.spaceBetween,
              Styles.alignCenter,
              Styles.ph20,
              Styles.pv10,
              Styles.bgWhite,
              {
                borderBottomWidth: 1,
                borderColor: color.border,
              },
            ]}
            key={item.label}
          >
            <View style={[Styles.flexRow, Styles.alignCenter]}>
              <FontAwesome5
                name={item.icon}
                color={color.primary}
                solid
                size={20}
                style={[
                  Styles.mr20,
                  Styles.alignCenter,
                  { width: 25, height: 22 },
                ]}
              ></FontAwesome5>
              <Text style={Styles.fontPreBold}>{item.label}</Text>
            </View>
            <FontAwesome5
              name={"chevron-right"}
              color={"gray"}
              solid
              size={15}
            ></FontAwesome5>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bg: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  avt: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  borderAvt: {
    borderWidth: 25,
    borderColor: color.secondary,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 33,
    height: 15,
    marginRight: 15,
  },
  btn: {
    padding: 7,
    width: 100,
    borderRadius: 7,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    padding: 7,
    width: 100,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 20,
  },
});
