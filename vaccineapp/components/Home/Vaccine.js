import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import Styles, { color, logo } from "../../styles/Styles";
import { useLoading } from "../contexts/LoadingContext";
import VaccineCard from "../common/VaccineCard";
import Apis, { endpoints } from "../../configs/Apis";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Vaccine = () => {
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleSort = () => {
    if (!sort) setSort("price_asc");
    else if (sort === "price_asc") setSort("price_desc");
    else setSort();
  };

  const queryTimer = useRef();

  const handleQuery = (q) => {
    setText(q);
    if (queryTimer.current) {
      clearTimeout(queryTimer.current);
    }

    queryTimer.current = setTimeout(() => {
      setQuery(q);
    }, 500);
  };

  const loadData = async () => {
    if (page != 0) {
      try {
        setLoading(true);
        let url = endpoints.vaccines + "?page=" + page;
        if (query) url += `&q=${query}`;
        if (sort) url += `&sort_by=${sort}`;
        console.log(url);
        let res = await Apis.get(url);
        if (page === 1) {
          setVaccines(res.data.results);
        } else {
          setVaccines((prev) => [...prev, ...res.data.results]);
        }

        setCount(res.data.count);
        if (res.data.next === null) {
          setPage(0);
          console.log("ok");
        }
      } catch (ex) {
        console.log(ex.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setVaccines([]);
    setPage(1);
  }, [query, sort]);

  useEffect(() => {
    if (page > 0) loadData();
  }, [page, query, sort]);

  const loadMore = () => {
    if (!loading && page > 0) {
      setPage(page + 1);
    }
  };

  return (
    <View style={Styles.flex}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Tìm kiếm theo tên vắc xin..."
          value={text}
          onChangeText={handleQuery}
          iconColor="white"
          placeholderTextColor={"white"}
          style={styles.searchBar}
          inputStyle={{ color: "white", marginLeft: -8 }}
          cursorColor={"white"}
        ></Searchbar>
      </View>
      <View
        style={[
          Styles.flexRow,
          Styles.spaceBetween,
          Styles.ph20,
          Styles.pv10,
          { backgroundColor: "#f7f8fd" },
        ]}
      >
        <TouchableOpacity
          style={[Styles.flexRow, Styles.alignCenter]}
          onPress={handleSort}
        >
          <Text style={[Styles.ph10, { color: "gray" }]}>Giá</Text>
          <FontAwesome5
            name={
              !sort
                ? "sort"
                : sort === "price_asc"
                ? "sort-amount-up"
                : "sort-amount-down-alt"
            }
            color={"gray"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.flexRow, Styles.alignCenter]}>
          <FontAwesome5 name="filter" color={color.primary} />
          <Text style={[Styles.ph10, { color: "gray" }]}>Lọc</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.ph20, Styles.bgWhite, Styles.flex]}>
        <FlatList
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          data={vaccines}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          ListHeaderComponent={
            <View
              style={[Styles.mb20, Styles.mt10, { alignItems: "flex-end" }]}
            >
              <Text style={{ color: "gray" }}>Có {count} kết quả</Text>
            </View>
          }
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                size="20"
                color={color.primary}
                style={Styles.mv20}
              />
            )
          }
          ListEmptyComponent={
            !loading && (
              <View
                style={[Styles.alignCenter, Styles.flexCenter, Styles.mt20]}
              >
                <Image
                  source={{ uri: logo.not_found }}
                  resizeMode="cover"
                  style={styles.notFound}
                />
                <Text style={[Styles.fontBold, Styles.fz18, { color: "gray" }]}>
                  Không tìm thấy dữ liệu
                </Text>
              </View>
            )
          }
          renderItem={({ item }) => (
            <VaccineCard
              name={item.name}
              disease={item.disease}
              image={item.image}
              price={item.price}
              btnSell
            />
          )}
        />
      </View>
    </View>
  );
};

export default Vaccine;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#0e48b0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1c61cd",
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notFound: {
    width: 300,
    height: 300,
  },
});
