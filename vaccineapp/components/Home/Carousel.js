import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");

const SPACING = 10;
const ITEM_WIDTH = width - SPACING * 4;

const data = [
  {
    id: "1",
    image:
      "https://vnvc.vn/wp-content/uploads/2025/04/vnvc-lam-viec-xuyen-le.jpg",
  },
  {
    id: "2",
    image:
      "https://vnvc.vn/wp-content/uploads/2025/03/trien-lam-phong-ve-hpv.jpg",
  },
  {
    id: "3",
    image:
      "https://vnvc.vn/wp-content/uploads/2025/02/dang-ky-tiem-vacxin-cho-to-chuc-truong-hoc-mobile.jpg",
  },
  {
    id: "4",
    image:
      "https://vnvc.vn/wp-content/uploads/2025/04/banner-benh-dai-va-cac-benh-nguy-hiem-mua-nang-mb.jpg",
  },
];

const Carousel = () => {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % data.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLayout = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: false });
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="normal"
        snapToAlignment="center"
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        onLayout={handleLayout}
      />
      <View style={styles.dotContainer}>
        {data.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>
    </>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING,
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 15,
    height: 3,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 15,
    height: 3,
    borderRadius: 4,
    backgroundColor: "#007AFF",
  },
});
