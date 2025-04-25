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
} from "./components/Home/CartModalProvider";
import History from "./components/Home/History";
import Vaccine from "./components/Home/Vaccine";
import Order from "./components/Home/Order";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, PaperProvider, Portal } from "react-native-paper";
import Profile from "./components/User/Profile";
import { color } from "./styles/Styles";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { openCart } = useCartModal();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="book"
        component={Book}
        options={({ navigation }) => ({
          title: "Đặt lịch",
          headerStyle: {
            backgroundColor: "#0a56df",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerRight: () => (
            <Button>
              <FontAwesome5 name="plus" size={20} color={"white"} />
            </Button>
          ),
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={20} color={"white"} />
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="vaccine"
        component={Vaccine}
        options={({ navigation }) => ({
          title: "Danh mục vắc xin",
          headerStyle: {
            backgroundColor: "#0a56df",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerRight: () => (
            <Button onPress={openCart}>
              <FontAwesome5 name="shopping-cart" size={20} color={"white"} />
            </Button>
          ),
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={20} color={"white"} />
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="history"
        component={History}
        options={({ navigation }) => ({
          title: "Lịch sử tiêm chủng",
          headerStyle: {
            backgroundColor: "#0a56df",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={20} color={"white"} />
            </Button>
          ),
        })}
      />
      <Stack.Screen
        name="order"
        component={Order}
        options={({ navigation }) => ({
          title: "Đặt mua vắc xin",
          headerStyle: {
            backgroundColor: "#0a56df",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-left" size={20} color={"white"} />
            </Button>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="TRANG CHỦ"
        component={StackNavigator}
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
        component={Profile}
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
