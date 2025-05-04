import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "react-native-paper";
import Styles, { color, maxFilterPrice } from "../../styles/Styles";
import Apis, { endpoints } from "../../configs/Apis";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LoadingOverlay from "./LoadingOverlay";
import RangeSlider from "react-native-range-slider-expo";

const FilterModal = ({
  visible,
  onClose,
  setMaxPrice,
  setMinPrice,
  setFilterCates,
  maxPrice,
  minPrice,
  filterCates,
}) => {
  const [cate, setCate] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(maxFilterPrice);

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      checkedIds.includes(id)
        ? checkedIds.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const loadCate = async () => {
    if (page != 0) {
      try {
        setLoading(true);
        let url = endpoints.categories + "?page=" + page;
        let res = await Apis.get(url);
        if (page == 1) setCate(res.data.results);
        else setCate([...cate, ...res.data.results]);
        if (res.data.next === null) {
          setPage(0);
        }
      } catch (ex) {
        console.log(ex.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    if (page > 0) setPage(page + 1);
  };

  const handleConfirm = () => {
    setMinPrice(fromValue);
    setMaxPrice(toValue);
    setFilterCates(checkedIds);
    onClose();
  };

  const handleDelete = () => {
    setMinPrice(0);
    setMaxPrice(maxFilterPrice);
    setFilterCates([]);
    onClose();
  };

  useEffect(() => {
    setFromValue(minPrice);
    setToValue(maxPrice);
    setCheckedIds(filterCates);
  }, [visible]);

  useEffect(() => {
    loadCate();
  }, [page]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.overlayTouchable} onPress={onClose} />
        <View style={styles.modalContainer}>
          <View
            style={[
              Styles.rowSpaceCenter,
              {
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: color.border,
                paddingRight: 10,
                paddingLeft: 20,
              },
            ]}
          >
            <Text style={styles.title}>Lọc vắc xin</Text>
            <Button mode="text" onPress={onClose} textColor="black">
              Đóng
            </Button>
          </View>
          <ScrollView style={styles.body}>
            <Text style={styles.label}>Loại vắc xin</Text>
            {cate.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleCheck(item.id)}
                style={styles.checkbox}
              >
                <Checkbox
                  status={
                    checkedIds.includes(item.id) ? "checked" : "unchecked"
                  }
                  color={color.primary}
                ></Checkbox>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
            {page !== 0 && (
              <TouchableOpacity
                style={[styles.checkbox, Styles.flexCenter]}
                onPress={loadMore}
              >
                <Text style={[Styles.fontPreBold, { color: color.primary }]}>
                  Xem thêm{" "}
                </Text>
                <FontAwesome5 name="chevron-down" color={color.primary} />
              </TouchableOpacity>
            )}
            <Text style={styles.label}>Giá</Text>
            <View style={[Styles.ph20, Styles.mt10]}>
              <View style={[Styles.rowSpaceCenter]}>
                <Text>Giá vắc xin</Text>
                <Text style={Styles.fontBold}>
                  {`${fromValue.toLocaleString()} VNĐ - ${toValue.toLocaleString()} VNĐ`}
                </Text>
              </View>
              <RangeSlider
                min={0}
                max={maxFilterPrice}
                fromValueOnChange={setFromValue}
                toValueOnChange={setToValue}
                initialFromValue={fromValue}
                initialToValue={toValue}
                styleSize="small"
                outOfRangeBarColor="#ccc"
                toKnobColor={color.primary}
                fromKnobColor={color.primary}
                showValueLabels={false}
                showRangeLabels={false}
                step={100000}
                inRangeBarColor="#84aeea"
              />
            </View>
          </ScrollView>
          <View
            style={[
              styles.iBottom,
              Styles.flexRow,
              Styles.g10,
              Styles.ph20,
              Styles.pv20,
            ]}
          >
            <Button style={styles.btn1} onPress={handleDelete}>
              <Text style={[Styles.fontBold, { color: color.primary }]}>
                Xóa lọc
              </Text>
            </Button>
            <Button style={styles.btn2} onPress={handleConfirm}>
              <FontAwesome5
                name="filter"
                color={"white"}
                size={14}
              ></FontAwesome5>
              <Text style={{ color: "white" }}> Lọc</Text>
            </Button>
          </View>
        </View>
      </View>
      <LoadingOverlay visible={loading}></LoadingOverlay>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
    position: "relative",
  },

  body: {
    // paddingHorizontal: 20,
    overflow: "scroll",
    flex: 1,
  },
  modalContainer: {
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
    paddingBottom: 90,
    height: "90%",
  },
  overlayTouchable: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  label: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: color.border,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: color.secondary,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: color.border,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  iBottom: {
    borderTopWidth: 1,
    borderColor: color.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    width: "100%",
  },
  btn2: {
    backgroundColor: color.primary,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 5,
  },
  btn1: {
    borderColor: color.primary,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 5,
  },
});
