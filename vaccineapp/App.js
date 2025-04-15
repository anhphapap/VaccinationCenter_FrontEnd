import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Book from "./components/Home/Book";
import Cart from "./components/Home/Cart";
import History from "./components/Home/History";
import Vaccine from "./components/Home/Vaccine";
import Order from "./components/Home/Order";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="book" component={Book} />
      <Stack.Screen name="cart" component={Cart} />
      <Stack.Screen name="vaccine" component={Vaccine} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="order" component={Order} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="TRANG CHỦ"
        component={StackNavigator}
        options={{
          tabBarIcon: () => <Icon name="home" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
