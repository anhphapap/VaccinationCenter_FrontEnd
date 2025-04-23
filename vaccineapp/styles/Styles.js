import { StyleSheet } from "react-native";

export const color = {
  primary: "#0a56df",
  border: "#c7c8d0",
  secondary: "#e7e9f360",
  white: "#fff",
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
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20,
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
});
