import { StyleSheet } from "react-native";

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
});
