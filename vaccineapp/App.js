import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Book from "./components/Home/Book";
import Cart, {
  CartModalProvider,
  useCartModal,
} from "./components/common/CartModalProvider";
import History from "./components/Home/History";
import Vaccine from "./components/Home/Vaccine";
import Order from "./components/Home/Order";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, PaperProvider, Portal } from "react-native-paper";
import Profile from "./components/User/Profile";
import { color } from "./styles/Styles";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const { openCart } = useCartModal();
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
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
        options={{
          title: "Danh mục vắc xin",
          headerRight: () => (
            <Button onPress={openCart}>
              <FontAwesome5 name="shopping-cart" size={20} color={"white"} />
            </Button>
          ),
        }}
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
    </HomeStack.Navigator>
  );
};

const AccountStack = createNativeStackNavigator();

const AccountStackNavigator = () => {
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
  return (
    <CartModalProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </CartModalProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
