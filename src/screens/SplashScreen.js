import React, { useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../Contexts/UserContext";

const SplashScreen = () => {
  const state = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((data) => {
        if (data !== null) {
          const user = JSON.parse(data);
          state.setToken(user.token);
          state.setEmail(user.email);
          state.setUserName(user.userName);
          state.setUserRole(user.userRole);
          state.setIsLoggedIn(true);
        }
        state.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Tокеныг утаснаас уншиж чадсангүй. : " + err.message)
      );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="gray" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          top: 20,
        }}
      >
        Түр хүлээнэ үү...
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
