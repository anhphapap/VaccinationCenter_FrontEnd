import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles, { color } from "../../styles/Styles";
import { DatePickerInput } from "react-native-paper-dates";
import { registerTranslation } from "react-native-paper-dates";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { addDays, max, subDays } from "date-fns";

const DatePicker = ({
  date,
  setDate,
  type = "forward",
  startDate,
  endDate,
}) => {
  registerTranslation("vi", {
    save: "Lưu",
    selectSingle: "Chọn ngày mong muốn",
    selectMultiple: "Chọn nhiều ngày",
    selectRange: "Chọn khoảng ngày",
    notAccordingToDateFormat: (inputFormat) =>
      `Ngày không đúng định dạng ${inputFormat}`,
    mustBeHigherThan: (date) => `Phải sau ngày ${date}`,
    mustBeLowerThan: (date) => `Phải trước ngày ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Phải trong khoảng ${startDate} - ${endDate}`,
    dateIsDisabled: "Ngày này không được chọn",
    previous: "Trước",
    next: "Tiếp",
    typeInDate: "Nhập ngày",
    pickDateFromCalendar: "Chọn từ lịch",
    close: "Đóng",
  });
  const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: "#007AFF",
      surfaceVariant: "#fff",
      outline: "#ccc",
    },
  };
  const validRange =
    type === "back"
      ? { endDate: subDays(new Date(), 1) }
      : type === "foward"
      ? { startDate: addDays(new Date(), 0) }
      : {
          startDate:
            new Date().getTime() > startDate.getTime() ? new Date() : startDate,
          endDate: subDays(endDate, 1),
        };

  return (
    <PaperProvider theme={theme}>
      <View>
        <DatePickerInput
          locale="vi"
          label="Chọn ngày"
          value={date}
          onChange={(d) => setDate(d)}
          inputMode="start"
          mode="outlined"
          withDateFormatInLabel={false}
          validRange={validRange}
          placeholderTextColor={color.border}
        />
      </View>
    </PaperProvider>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
