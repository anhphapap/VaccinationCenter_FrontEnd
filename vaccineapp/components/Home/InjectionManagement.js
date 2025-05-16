import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Styles, { color } from "../../styles/Styles";
import InjectionManagementCard from "../common/InjectionManagementCard";
import { Searchbar } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useLoading } from "../../contexts/LoadingContext";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoneHistory from "../common/NoneHistory";

const InjectionManagement = () => {
  const [text, setText] = useState("");
  const queryTimer = useRef();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState();
  const [today, setToday] = useState(false);
  const [listInjection, setListInjection] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [filterVisible, setFilterVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState();

  const handleQuery = (q) => {
    setText(q);
    if (queryTimer.current) {
      clearTimeout(queryTimer.current);
    }

    queryTimer.current = setTimeout(() => {
      setQuery(q);
    }, 500);
  };

  const handleSort = () => {
    if (!sort) setSort("date_asc");
    else if (sort === "date_asc") setSort("date_desc");
    else setSort();
  };

  const loadData = async () => {
    if (page === 0) return;
    try {
      setLoading(true);
      showLoading();
      const token = await AsyncStorage.getItem("token");
      let url = endpoints.injections + `?page=${page}`;

      // if (query) url += `?q=${query}`;
      if (sort) url += `&sort_by=${sort}`;
      if (today) {
        const todayDate = new Date().toISOString().split("T")[0];
        url += `&injection_date=${todayDate}`;
      }

      const res = await authApis(token).get(url);
      if (res.data.next === null) {
        setPage(0);
      }
      setCount(res.data.count);
      if (page === 1) {
        setListInjection(res.data.results);
      } else {
        setListInjection((prev) => [...prev, ...res.data.results]);
      }
    } catch (error) {
      console.log("Lỗi khi tải danh sách tiêm:", error);
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && page > 0) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setListInjection([]);
    setPage(1);
  }, [query, sort, today]);

  useEffect(() => {
    loadData();
  }, [query, sort, today, page]);

  return (
    <View style={[Styles.bgWhite, Styles.flex]}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Tìm kiếm theo tên bệnh nhân..."
          value={text}
          onChangeText={handleQuery}
          iconColor="white"
          placeholderTextColor={"white"}
          style={styles.searchBar}
          inputStyle={{ color: "white", marginLeft: -8 }}
          cursorColor={"white"}
        ></Searchbar>
      </View>
      <View>
        <View
          style={[
            Styles.flexRow,
            Styles.spaceBetween,
            Styles.ph20,
            Styles.pv10,
            { backgroundColor: "#f7f8fd" },
          ]}
        >
          <View style={[Styles.flexRow, Styles.g20]}>
            <TouchableOpacity
              style={[Styles.flexRow, Styles.alignCenter]}
              onPress={handleSort}
            >
              <Text style={[Styles.ph10, { color: "gray" }]}>Ngày</Text>
              <FontAwesome5
                name={
                  !sort
                    ? "sort"
                    : sort === "date_asc"
                    ? "sort-amount-up"
                    : "sort-amount-down-alt"
                }
                color={"gray"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Styles.ph10,
                {
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: color.border,
                  backgroundColor: today ? color.primary : "white",
                },
              ]}
              onPress={() => setToday(!today)}
            >
              <Text style={{ color: today ? "white" : "gray" }}>Hôm nay</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[Styles.flexRow, Styles.alignCenter]}
            onPress={() => setFilterVisible(!filterVisible)}
          >
            <View style={{ position: "relative" }}>
              <FontAwesome5 name="filter" color={color.primary} />
            </View>
            <Text style={[Styles.ph10, { color: "gray" }]}>Lọc</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        onEndReached={loadMore}
        // onEndReachedThreshold={0.6}
        data={listInjection}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        ListHeaderComponent={
          <View
            style={[
              Styles.mb20,
              Styles.mt10,
              Styles.ph20,
              { alignItems: "flex-end" },
            ]}
          >
            <Text style={{ color: "gray" }}>Có {count} lịch tiêm</Text>
          </View>
        }
        // ListFooterComponent={
        //   loading && (
        //     <ActivityIndicator
        //       size="20"
        //       color={color.primary}
        //       style={Styles.mv20}
        //     />
        //   )
        // }
        ListEmptyComponent={
          !loading && (
            <NoneHistory
              title="Không tồn tại lịch tiêm nào"
              style={{ marginTop: 100 }}
            ></NoneHistory>
          )
        }
        renderItem={({ item }) => (
          <InjectionManagementCard key={item.id} item={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default InjectionManagement;

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    backgroundColor: "#0e48b0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1c61cd",
    paddingHorizontal: 10,
  },
});
