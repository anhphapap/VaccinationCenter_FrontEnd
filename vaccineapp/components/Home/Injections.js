import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import InjectionCard from "../common/InjectionCard";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import useUser from "../../hooks/useUser";

const Injections = () => {
  const user = useUser();
  return (
    <ScrollView style={[Styles.flex, Styles.bgWhite]}>
      <View style={styles.header}>
        <View style={styles.borderAvt}>
          <Image
            source={{
              uri: defaultAvatar,
            }}
            style={styles.avt}
          ></Image>
        </View>
        <Text
          style={[
            Styles.fontBold,
            Styles.mt10,
            {
              textTransform: "uppercase",
              color: color.primary,
              width: "100%",
              textAlign: "center",
            },
          ]}
        >
          Phạm Anh Pha
        </Text>
        <Text style={{ color: color.primary }}>Nam - 17/09/2004</Text>
      </View>
      <InjectionCard></InjectionCard>
      <InjectionCard></InjectionCard>
    </ScrollView>
  );
};

export default Injections;

const styles = StyleSheet.create({
  avt: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  borderAvt: {
    borderWidth: 3,
    borderColor: color.primary,
    width: 66,
    height: 66,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: color.secondary,
    borderBottomWidth: 10,
    width: "100%",
  },
});
