import { StyleSheet } from "react-native";

export const defaultAvatar =
  "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png";

export const color = {
  // primary: "#0a56df",
  primary: "#0462d7",
  primary2: "#f89221",
  border: "#c7c8d0",
  secondary: "#e7e9f360",
  white: "#fff",
};

export const logo = {
  icon: "https://res.cloudinary.com/dpmek7kuc/image/upload/t_logo2/v1745747860/logo_m2c3di.png",
  icon_name:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/t_logo2/v1745747860/logo_name2_ca9hh7.png",
  icon_name2:
    "https://res.cloudinary.com/dpmek7kuc/image/upload/v1745747859/logo_name_iqeu0d.png",
  name: "https://res.cloudinary.com/dpmek7kuc/image/upload/v1745747858/name_odjnan.png",
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
  mr10: {
    marginRight: 10,
  },
  mr20: {
    marginRight: 20,
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
});
