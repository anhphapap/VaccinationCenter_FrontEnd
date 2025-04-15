import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Image, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

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

const ITEM_WIDTH = width - 30;
const SPACER = (width - ITEM_WIDTH) / 2;

const Carousel = () => {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % data.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      snapToAlignment="center"
      contentContainerStyle={{ paddingHorizontal: SPACER }}
      renderItem={({ item }) => (
        <View style={{ width: ITEM_WIDTH, marginHorizontal: 5 }}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
      )}
    />
  );
};

export default Carousel;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
