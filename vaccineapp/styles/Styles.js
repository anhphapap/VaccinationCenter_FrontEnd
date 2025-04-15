import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flexCol: {
    flex: 1,
    flexDirection: "column",
  },
  flexRow: {
    flex: 1,
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
