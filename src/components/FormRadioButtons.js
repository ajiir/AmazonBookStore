import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { textColor, mainColor } from "../../Constants";
import Feather from "react-native-vector-icons/Feather";
import {
  RadioButton,
  Text as RadioText,
  TouchableRipple,
} from "react-native-paper";

const FormRadioButton = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 35, color: textColor }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          borderBottomColor: "#f2f2f2",
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}
      >
        <Feather name={props.icon} size={20} color={textColor} />

        <View style={{ flexDirection: "column" }}>
          {props.data.map((el, index) => {
            const categoryId = props.values[index];
            return (
              <View key={index} style={css.row}>
                <RadioButton
                  color={mainColor}
                  value={categoryId}
                  onPress={() => {
                    props.onValueChange(categoryId);
                  }}
                  status={props.value === categoryId ? "checked" : "unchecked"}
                />
                <TouchableRipple
                  onPress={() => {
                    props.onValueChange(categoryId);
                  }}
                >
                  <RadioText style={css.text}>{el}</RadioText>
                </TouchableRipple>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FormRadioButton;

const css = StyleSheet.create({
  text: {
    color: textColor,
    marginTop: 7,
  },

  row: {
    flexDirection: "row",
    marginLeft: 10,
  },
});
