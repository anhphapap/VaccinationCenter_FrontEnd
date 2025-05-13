import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useReducer } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import History from "./components/Home/History";
import Vaccine from "./components/Home/Vaccine";
import Order from "./components/Home/Order";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Badge, Button, PaperProvider, Portal } from "react-native-paper";
import Profile from "./components/User/Profile";
import Styles, { color, logo } from "./styles/Styles";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import RegisterProfile from "./components/User/RegisterProfile";
import UserReducer from "./reducers/UserReducer";
import { MyDispatchContext, MyUserContext } from "./contexts/Contexts";
import useUser from "./hooks/useUser";
import ProfileSetting from "./components/User/ProfileSetting";
import ChangePassword from "./components/User/ChangePassword";
import { LoadingProvider } from "./contexts/LoadingContext";
import Toast from "react-native-toast-message";
import VaccineDetails from "./components/Home/VaccineDetails";
import Cart from "./components/Home/Cart";
import { LogBox } from "react-native";
import AddVaccine from "./components/Home/AddVaccine";
import { VaccineProvider } from "./contexts/VaccineContext";
import Injections from "./components/Home/Injections";
import Notification from "./components/Home/Notification";
import HistoryDetails from "./components/Home/HistoryDetails";
import { CartContext, CartProvider } from "./contexts/CartContext";
import AddFromCart from "./components/Home/AddFromCart";
import InjectionManagement from "./components/Home/InjectionManagement";
import Receipt from "./components/Home/Receipt";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
  "Support for defaultProps will be removed from memo components",
]);

const Stack = createNativeStackNavigator();
const RegisterProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerTintColor: "#fff",
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="RegisterProfile"
      component={RegisterProfile}
      options={{
        headerLeft: null,
        title: "Đăng ký thông tin",
        headerShadowVisible: false,
      }}
    />
  </Stack.Navigator>
);

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
        presentation: "transparentModal",
        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color={"white"} />
          </Button>
        ),
      })}
    >
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="injectionManagement"
        component={InjectionManagement}
        options={{
          title: "Quản lý lịch tiêm",
        }}
      />
      <HomeStack.Screen
        name="vaccine"
        component={Vaccine}
        options={({ navigation }) => ({
          title: "Danh mục vắc xin",
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("cart")}
              style={Styles.ph20}
            >
              <FontAwesome5 name="shopping-bag" size={20} color={"white"} />
              {cartItems.length > 0 && (
                <Badge
                  size={15}
                  style={{
                    backgroundColor: "red",
                    position: "absolute",
                    right: 13,
                    bottom: -7,
                  }}
                >
                  {cartItems.length}
                </Badge>
              )}
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="vaccineDetails"
        component={VaccineDetails}
        options={({ navigation }) => ({
          title: "Chi tiết vắc xin",
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("cart")}
              style={Styles.ph20}
            >
              <FontAwesome5 name="shopping-bag" size={20} color={"white"} />
              {cartItems.length > 0 && (
                <Badge
                  size={15}
                  style={{
                    backgroundColor: "red",
                    position: "absolute",
                    right: 13,
                    bottom: -7,
                  }}
                >
                  {cartItems.length}
                </Badge>
              )}
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="history"
        component={History}
        options={{ title: "Lịch sử tiêm chủng" }}
      />
      <HomeStack.Screen
        name="historyDetails"
        component={HistoryDetails}
        options={{ title: "Chi tiết lịch sử tiêm" }}
      />
      <HomeStack.Screen
        name="order"
        component={Order}
        options={{ title: "Đặt mua vắc xin" }}
      />
      <HomeStack.Screen
        name="receipt"
        component={Receipt}
        options={{ title: "Hóa đơn" }}
      />
      <HomeStack.Screen
        name="addVaccines"
        component={AddVaccine}
        options={{ title: "Thêm mới vắc xin", headerShadowVisible: false }}
      />
      <HomeStack.Screen
        name="cart"
        component={Cart}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <HomeStack.Screen
        name="addFromCart"
        component={AddFromCart}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />
      <HomeStack.Screen
        name="notification"
        component={Notification}
        options={() => ({
          title: "Thông báo",
          headerShadowVisible: false,
          headerRight: () => (
            <Button>
              <FontAwesome5 name="check-double" size={16} color={"white"} />
            </Button>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator();

const AccountStackNavigator = () => {
  const user = useUser();
  return (
    <AccountStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: color.primary,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerLeft: () => (
          <Button onPress={() => navigation.navigate("profile")}>
            <FontAwesome5 name="arrow-left" size={20} color={"white"} />
          </Button>
        ),
      })}
    >
      <AccountStack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      {user ? (
        <>
          <AccountStack.Screen
            name="profileSetting"
            component={ProfileSetting}
            options={{ title: "Chỉnh sửa thông tin" }}
          />
          <AccountStack.Screen
            name="changePassword"
            component={ChangePassword}
            options={{ title: "Đổi mật khẩu" }}
          />
        </>
      ) : (
        <>
          <AccountStack.Screen
            name="login"
            component={Login}
            options={{ title: "Đăng nhập" }}
          />
          <AccountStack.Screen
            name="register"
            component={Register}
            options={{ title: "Đăng ký" }}
          />
        </>
      )}
    </AccountStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

        let tabBarStyle = {};
        if (
          (route.name === "TRANG CHỦ" && routeName && routeName !== "home") ||
          (route.name === "TÀI KHOẢN" &&
            routeName &&
            routeName !== "profile") ||
          route.name === "NHẮC LỊCH TIÊM"
        ) {
          tabBarStyle = { display: "none" };
        } else {
          tabBarStyle = { display: "flex" };
        }

        return {
          headerShown: false,
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: "#a2a4a7",
          tabBarStyle,
        };
      }}
    >
      <Tab.Screen
        name="TRANG CHỦ"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={{ uri: logo.icon }}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <Image
                source={{
                  uri: logo.icon_line_lightgray,
                }}
                style={{ width: 24, height: 24 }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="NHẮC LỊCH TIÊM"
        component={Injections}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="calendar-check"
              size={24}
              color={focused ? color.primary : "#a2a4a7"}
              solid={focused}
            />
          ),
          headerStyle: {
            backgroundColor: color.primary,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShown: true,
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={20} color={"white"} />
            </Button>
          ),
        })}
      />
      <Tab.Screen
        name="TÀI KHOẢN"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user"
              size={24}
              solid={focused}
              color={focused ? color.primary : "#a2a4a7"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, dispatch] = useReducer(UserReducer, null);
  return (
    <>
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <LoadingProvider>
            <VaccineProvider>
              <CartProvider>
                <SafeAreaProvider>
                  <NavigationContainer>
                    {!user || user.is_completed_profile ? (
                      <TabNavigator />
                    ) : (
                      <RegisterProfileStack />
                    )}
                  </NavigationContainer>
                </SafeAreaProvider>
              </CartProvider>
            </VaccineProvider>
          </LoadingProvider>
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
