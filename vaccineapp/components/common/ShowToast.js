import Toast from "react-native-toast-message";

export const showToast = ({ type = "success", text1, text2 }) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "top",
    topOffset: 80,
    visibilityTime: 2500,
    autoHide: true,
  });
};
