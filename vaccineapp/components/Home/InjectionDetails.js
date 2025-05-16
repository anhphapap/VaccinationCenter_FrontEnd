import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InjectionForm from "./InjectionForm";

const InjectionDetails = ({ route }) => {
  return <InjectionForm route={route} mode="staff" />;
};

export default InjectionDetails;

const styles = StyleSheet.create({});
