import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import Styles, { color, maxFilterPrice } from "../../styles/Styles";
import DropDownPicker from "react-native-dropdown-picker";

const UpdateStatusModal = ({ visible, onClose, status, note, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const [listStatus, setListStatus] = useState([]);
  const [pendingNote, setPendingNote] = useState("");
  useEffect(() => {
    setListStatus(list);
    setSelectedStatus(status);
    setPendingNote(note);
  }, [status, note]);
  const list = [
    {
      label: "Chưa tiêm",
      value: "NOT_VACCINATED",
    },
    {
      label: "Đã tiêm",
      value: "VACCINATED",
    },
    {
      label: "Bỏ lỡ",
      value: "MISSED",
    },
  ];
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
              Styles.alignCenter,
              {
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: color.border,
              },
            ]}
          >
            <Text style={styles.title}>Cập nhập trạng thái</Text>
          </View>
          <View style={styles.body}>
            <Text style={[Styles.fontBold, Styles.mb10]}>Trạng thái</Text>
            <View style={{ zIndex: open ? 10 : 1 }}>
              <DropDownPicker
                open={open}
                value={selectedStatus}
                items={listStatus.map((c) => ({
                  label: c.label,
                  value: c.value,
                }))}
                setOpen={setOpen}
                setValue={setSelectedStatus}
                setItems={setListStatus}
                placeholder="Chọn trạng thái"
                listMode="SCROLLVIEW"
                style={[Styles.rounded10, { borderColor: color.border }]}
                dropDownContainerStyle={{ borderColor: color.border }}
                selectedItemContainerStyle={{
                  backgroundColor: color.border,
                }}
                textStyle={Styles.fontPreBold}
              />
              <Text style={[Styles.fontBold, Styles.mv10]}>
                Ghi chú sức khỏe
              </Text>
              <TextInput
                value={pendingNote}
                onChangeText={setPendingNote}
                placeholder="Nhập ghi chú..."
                style={styles.textInput}
                multiline={true}
              />
              <View style={[Styles.rowSpaceCenter, Styles.mt20, { gap: 10 }]}>
                <Button style={styles.btn2} onPress={onClose}>
                  <Text style={{ color: color.primary }}>Hủy</Text>
                </Button>
                <Button
                  style={styles.btn1}
                  onPress={() => onUpdate(selectedStatus, pendingNote)}
                >
                  <Text style={[Styles.fontBold, { color: "white" }]}>
                    Cập nhập
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateStatusModal;

const styles = StyleSheet.create({
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
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    backgroundColor: color.white,
    borderRadius: 20,
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 10,
    padding: 10,
    height: 200,
    alignContent: "flex-start",
    textAlignVertical: "top",
  },
  body: {
    padding: 20,
  },
  btn1: {
    backgroundColor: color.primary,
    borderRadius: 10,
    flex: 1,
  },
  btn2: {
    borderColor: color.primary,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
});
