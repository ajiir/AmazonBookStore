import React, { useState, useContext } from "react";
import axios from "axios";
import { View, Text, Image, Alert } from "react-native";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import UserContext from "../Contexts/UserContext";

export default function ({ route, navigation }) {
  const [email, setEmail] = useState("ajiir2247@gmail.com");
  const [password, setPassword] = useState("@jiiR2247");
  const [error, setError] = useState(null);

  const state = useContext(UserContext);

  const loginHandler = () => {
    if (email.length === 0) {
      Alert.alert("Та и-мэйл хаягаа бичнэ үү?");
      return;
    }

    if (password.length === 0) {
      Alert.alert("Та нууц үгээ бичнэ үү?");
      return;
    }

    state.login(email, password);
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
        Та и-мэйл хаяг нууц үгээ оруулна уу?
      </Text>

      {error && (
        <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
          {error}
        </Text>
      )}

      <MyInput
        keyboardType="email-address"
        placeholder="И-мэйл хаягаа оруулна уу"
        onChangeText={setEmail}
        value={email}
      />
      <MyInput
        keyboardType="default"
        secureTextEntry={true}
        placeholder="Нууц үгээ оруулна уу"
        onChangeText={setPassword}
        value={password}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton title="Буцах" onPress={() => navigation.goBack()} />
        <MyButton title="Нэвтрэх" onPress={loginHandler} />
      </View>
    </View>
  );
}
