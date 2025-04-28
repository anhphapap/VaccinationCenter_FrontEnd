import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const EventBanner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.rophim.me/images/event_304/behind-hero.webp",
        }}
        style={styles.behindHero}
        resizeMode="cover"
      ></Image>
      <Image
        source={{
          uri: "https://www.rophim.me/images/event_304/vn-flag-full.gif",
        }}
        style={styles.vnFlag}
        resizeMode="cover"
      />
      <Image
        source={{
          uri: "https://www.rophim.me/images/event_304/hero.webp",
        }}
        style={styles.hero}
        resizeMode="cover"
      ></Image>
      <Image
        source={{
          uri: "https://www.rophim.me/images/event_304/50y.webp",
        }}
        style={styles.y50}
        resizeMode="cover"
      ></Image>
    </View>
  );
};

export default EventBanner;

const styles = StyleSheet.create({
  behindHero: {
    width: "100%",
    height: 120,
    borderRadius: 15,
    position: "relative",
  },
  hero: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 120,
    height: 120,
  },
  y50: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 140,
    height: 80,
  },
  container: {
    // marginTop: 10,
  },
  vnFlag: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -10,
    left: 15,
    transform: [{ rotate: "-23deg" }],
  },
});
