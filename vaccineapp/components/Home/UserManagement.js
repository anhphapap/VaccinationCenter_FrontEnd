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
import { useLoading } from "../../contexts/LoadingContext";
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoneHistory from "../common/NoneHistory";
import UserManagementCard from "../common/UserManagementCard";

const UserManagement = () => {
  const [text, setText] = useState("");
  const queryTimer = useRef();
  const [query, setQuery] = useState("");
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

  const loadData = async () => {
    if (page === 0) return;
    try {
      setLoading(true);
      showLoading();
      const token = await AsyncStorage.getItem("token");
      let url = endpoints.userManagement + `?page=${page}`;

      // if (query) url += `?q=${query}`;

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
  }, [query]);

  useEffect(() => {
    loadData();
  }, [query, page]);
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
            <Text style={{ color: "gray" }}>Có {count} bệnh nhân</Text>
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
          <UserManagementCard key={item.id} item={item} />
        )}
      ></FlatList>
    </View>
  );
};

export default UserManagement;

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
