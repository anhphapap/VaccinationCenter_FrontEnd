import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FilterModal from "../common/FilterModal";
import { ActivityIndicator, Badge, Searchbar } from "react-native-paper";
import Styles, { color, logo, maxFilterPrice } from "../../styles/Styles";
import Apis, { endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";
import VaccineCard from "../common/VaccineCard";
import { VaccineContext } from "../../contexts/VaccineContext";
import FloatBottomButton from "../common/FloatBottomButton";
import { showToast } from "../common/ShowToast";
import NoneVaccine from "../common/NoneVaccine";
import { CartContext } from "../../contexts/CartContext";

const VaccinesForm = ({ addForm }) => {
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const { selectedVaccines, addVaccine } = useContext(VaccineContext);
  const [preSelect, setPreSelect] = useState(selectedVaccines);
  const nav = useNavigation();
  const [filterCates, setFilterCates] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxFilterPrice);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

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
        if (minPrice !== 0) url += `&min_price=${minPrice}`;
        if (maxPrice !== maxFilterPrice) url += `&max_price=${maxPrice}`;
        if (filterCates && filterCates.length > 0) {
          filterCates.forEach((id) => {
            url += `&cate=${id}`;
          });
        }
        let res = await Apis.get(url);
        if (res.data.next === null) {
          setPage(0);
        }
        if (page === 1) {
          setVaccines(res.data.results);
        } else {
          setVaccines((prev) => [...prev, ...res.data.results]);
        }

        setCount(res.data.count);
      } catch (ex) {
        console.log(ex.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConfirm = () => {
    addVaccine(preSelect);
    nav.goBack();
  };

  const handlePreSelect = (item) => {
    if (preSelect.length === 3) {
      showToast({
        text1: "Một người tiêm chỉ được chọn tối đa 3 vắc xin lẻ",
        type: "info",
      });
    } else {
      setPreSelect([...preSelect, item]);
    }
  };

  useEffect(() => {
    setVaccines([]);
    setPage(1);
  }, [query, sort, maxPrice, minPrice, filterCates]);

  useEffect(() => {
    loadData();
  }, [page, query, sort, maxPrice, minPrice, filterCates]);

  const loadMore = () => {
    if (!loading && page > 0) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <View style={[Styles.flex]}>
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
          <TouchableOpacity
            style={[Styles.flexRow, Styles.alignCenter]}
            onPress={() => setFilterVisible(true)}
          >
            <View style={{ position: "relative" }}>
              <FontAwesome5 name="filter" color={color.primary} />
              {(filterCates.length !== 0 ||
                minPrice != 0 ||
                maxPrice != maxFilterPrice) && (
                <Badge size={10} style={styles.badge}>
                  <FontAwesome5 name="check" color={color.primary} size={4} />
                </Badge>
              )}
            </View>
            <Text style={[Styles.ph10, { color: "gray" }]}>Lọc</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            Styles.ph20,
            Styles.bgWhite,
            Styles.flex,
            [addForm && { marginBottom: 85 }],
          ]}
        >
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
                <NoneVaccine title="Không tìm thấy dữ liệu"></NoneVaccine>
              )
            }
            renderItem={({ item }) =>
              addForm ? (
                <VaccineCard
                  item={item}
                  addForm
                  select={handlePreSelect}
                  remove={(id) =>
                    setPreSelect((prev) => prev.filter((p) => p.id !== id))
                  }
                  selected={preSelect.some((v) => v.id === item.id)}
                />
              ) : (
                <VaccineCard
                  item={item}
                  showInfo={() =>
                    nav.navigate("vaccineDetails", { vaccineId: item.id })
                  }
                  addToCart={() => handleAddToCart(item)}
                  btnSell
                />
              )
            }
          />
        </View>
        {addForm && (
          <FloatBottomButton
            label={"Xác nhận (" + preSelect.length + ")"}
            press={
              preSelect.length === 0
                ? () =>
                    showToast({
                      type: "info",
                      text1: "Vui lòng chọn vắc xin!",
                    })
                : handleConfirm
            }
            disabled={preSelect.length === 0}
          />
        )}
      </View>
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filterCates={filterCates}
        maxPrice={maxPrice}
        minPrice={minPrice}
        setFilterCates={setFilterCates}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
      />
    </>
  );
};

export default VaccinesForm;

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

  badge: {
    position: "absolute",
    right: -5,
    bottom: -5,
    backgroundColor: color.primary2,
  },
});
