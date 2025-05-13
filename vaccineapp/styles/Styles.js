import { StyleSheet } from "react-native";

export const defaultAvatar =
  "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png";

export const maxFilterPrice = 5000000;

export const color = {
  // primary: "#0a56df",
  primary: "#0462d7",
  primary2: "#f89221",
  border: "#c7c8d0",
  secondary: "#e7e9f360",
  white: "#fff",
  bg: "#f1f5fe",
};

export const logo = {
  icon: "https://res.cloudinary.com/dpmek7kuc/image/upload/t_logo2/v1745747860/logo_m2c3di.png",
  icon_name:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/t_logo2/v1745747860/logo_name2_ca9hh7.png",
  icon_name2:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/v1745747859/logo_name_iqeu0d.png",
  name: "https://res.cloudinary.com/dpmek7kuc/image/upload/v1745747858/name_odjnan.png",
  not_found:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/v1746029472/not_found_hek9ye.png",
  injection_bg:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/v1746357625/injection_bg_tzb0gc.png",
  none_item:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/v1746426055/none_item_uuu4f7.png",
};

export default StyleSheet.create({
  flexCol: {
    flexDirection: "column",
  },
  flexRow: {
    flexDirection: "row",
  },
  rowSpaceCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWhite: {
    color: "white",
  },
  container: {
    flex: 1,
    padding: 10,
    position: "relative",
  },
  fontBold: {
    fontWeight: "bold",
  },
  fontPreBold: {
    fontWeight: "500",
  },
  g10: {
    gap: 10,
  },
  g20: {
    gap: 20,
  },
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb20: {
    paddingBottom: 20,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv20: {
    paddingVertical: 20,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mr10: {
    marginRight: 10,
  },
  mr20: {
    marginRight: 20,
  },
  ml10: {
    marginLeft: 10,
  },
  ml20: {
    marginLeft: 20,
  },
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh20: {
    marginHorizontal: 20,
  },
  fz16: {
    fontSize: 16,
  },
  fz18: {
    fontSize: 18,
  },
  fz20: {
    fontSize: 20,
  },
  border1: {
    borderWidth: 1,
    borderColor: color.border,
  },
  rounded10: {
    borderRadius: 10,
  },
  rounded20: {
    borderRadius: 20,
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  spaceEvenly: {
    justifyContent: "space-evenly",
  },
  flexStart: {
    justifyContent: "flex-start",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  flexCenter: {
    justifyContent: "center",
  },
  alignCenter: {
    alignItems: "center",
  },
  bgWhite: {
    backgroundColor: "white",
  },
  flex: {
    flex: 1,
  },
  wrap: {
    flexWrap: "wrap",
  },
  flexShink: {
    flexShrink: 1,
  },
  underline: {
    textDecorationLine: "underline",
  },
  uppercase: {
    textTransform: "uppercase",
  },
});
