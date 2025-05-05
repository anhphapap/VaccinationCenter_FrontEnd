import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import InjectionCard from "../common/InjectionCard";
import Styles, { color, defaultAvatar, logo } from "../../styles/Styles";
import HeaderUserInfo from "../common/HeaderUserInfo";
import NoneHistory from "../common/NoneHistory";

const Injections = () => {
  return (
    <ScrollView style={[Styles.flex, Styles.bgWhite]}>
      <HeaderUserInfo></HeaderUserInfo>
      <NoneHistory></NoneHistory>
      {/* <InjectionCard></InjectionCard>
      <InjectionCard></InjectionCard> */}
    </ScrollView>
  );
};

export default Injections;

const styles = StyleSheet.create({});
