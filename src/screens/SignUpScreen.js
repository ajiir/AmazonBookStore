import React, { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import UserContext from "../Contexts/UserContext";

export default function ({ route, navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const state = useContext(UserContext);

  const signUpHandler = () => {
    setError(null);

    if (name.length === 0) {
      Alert.alert("Та нэрээ оруулна уу?");
      return;
    }

    if (password1 !== password2) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна.");
      return;
    }

    state.signUp(name, email, password1);
  };

  return (
    <View>
      <Image
        style={{ width: "100%", height: "30%" }}
        source={require("../../assets/images/shop.png")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray",
        }}
      >
        Шинээр бүртгүүлэх
      </Text>
      {error && (
        <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
          {error}
        </Text>
      )}
      <MyInput
        value={name}
        keyboardType="default"
        placeholder="Нэрээ оруулна уу"
        onChangeText={setName}
      />

      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="И-мэйл хаягаа оруулна уу"
        onChangeText={setEmail}
      />
      <MyInput
        value={password1}
        keyboardType="default"
        secureTextEntry={true}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setPassword1}
      />
      <MyInput
        value={password2}
        keyboardType="default"
        secureTextEntry={true}
        placeholder="Нууц үгээ давтан оруулна уу"
        onChangeText={setPassword2}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <MyButton title="Буцах" onPress={() => navigation.goBack()} />
        <MyButton title="Бүртгүүлэх" onPress={signUpHandler} />
      </View>
    </View>
  );
}
