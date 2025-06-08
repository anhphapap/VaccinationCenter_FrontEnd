import AsyncStorage from "@react-native-async-storage/async-storage";

export default (current, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("expires_in");
      return null;
    case "update":
      return action.payload;
  }
  return current;
};
