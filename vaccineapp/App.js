import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useReducer } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Book from "./components/Home/Book";
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
import { Button, PaperProvider, Portal } from "react-native-paper";
import Profile from "./components/User/Profile";
import { color } from "./styles/Styles";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import RegisterProfile from "./components/User/RegisterProfile";
import UserReducer from "./reducers/UserReducer";
import {
  MyDispatchContext,
  MyUserContext,
} from "./components/contexts/Contexts";
import useUser from "./hooks/useUser";
import ProfileSetting from "./components/User/ProfileSetting";
import ChangePassword from "./components/User/ChangePassword";
import { LoadingProvider } from "./components/contexts/LoadingContext";
import Toast from "react-native-toast-message";
import VaccineDetails from "./components/Home/VaccineDetails";
import Cart from "./components/Home/Cart";
import { LogBox } from "react-native";
import AddVaccine from "./components/Home/AddVaccine";
import { VaccineProvider } from "./components/contexts/VaccineContext";

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
        name="book"
        component={Book}
        options={{
          title: "Đặt lịch",
          headerRight: () => (
            <Button>
              <FontAwesome5 name="plus" size={20} color={"white"} />
            </Button>
          ),
        }}
      />
      <HomeStack.Screen
        name="vaccine"
        component={Vaccine}
        options={({ navigation }) => ({
          title: "Danh mục vắc xin",
          headerShadowVisible: false,
          headerRight: () => (
            <Button onPress={() => navigation.navigate("cart")}>
              <FontAwesome5 name="shopping-bag" size={20} color={"white"} />
            </Button>
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
            <Button onPress={() => navigation.navigate("cart")}>
              <FontAwesome5 name="shopping-bag" size={20} color={"white"} />
            </Button>
          ),
        })}
      />
      <HomeStack.Screen
        name="history"
        component={History}
        options={{ title: "Lịch sử tiêm chủng" }}
      />
      <HomeStack.Screen
        name="order"
        component={Order}
        options={{ title: "Đặt mua vắc xin" }}
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
          (route.name === "TÀI KHOẢN" && routeName && routeName !== "profile")
        ) {
          tabBarStyle = { display: "none" };
        }

        return {
          headerShown: false,
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: "black",
          tabBarStyle,
        };
      }}
    >
      <Tab.Screen
        name="TRANG CHỦ"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={30}
              color={focused ? color.primary : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TÀI KHOẢN"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user"
              size={30}
              solid
              color={focused ? color.primary : "black"}
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
              <SafeAreaProvider>
                <NavigationContainer>
                  {!user || user.is_completed_profile ? (
                    <TabNavigator />
                  ) : (
                    <RegisterProfileStack />
                  )}
                </NavigationContainer>
              </SafeAreaProvider>
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
