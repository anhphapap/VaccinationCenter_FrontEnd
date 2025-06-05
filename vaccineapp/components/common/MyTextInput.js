import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { color } from "../../styles/Styles";

const MyTextInput = ({
  title,
  width = "100%",
  secure = false,
  onChangeText,
  value,
  editable = true,
  disabled = false,
}) => {
  const [view, setView] = useState(secure);
  return (
    <TextInput
      mode="outlined"
      style={[styles.txtInput, { width: width }]}
      outlineColor={color.border}
      activeOutlineColor={color.border}
      placeholder={title}
      outlineStyle={{ borderWidth: 1, borderRadius: 8 }}
      placeholderTextColor={color.border}
      secureTextEntry={view}
      right={
        secure && (
          <TextInput.Icon
            icon={view ? "eye" : "eye-off"}
            onPress={() => setView(!view)}
          />
        )
      }
      onChangeText={onChangeText}
      value={value}
      editable={editable}
      disabled={disabled}
    ></TextInput>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({});
