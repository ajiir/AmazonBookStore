import React from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import MyDrawerNavigator from "./src/navigation/MyDrawerNavigator";
import { UserStore } from "./src/Contexts/UserContext";

function App() {
  return (
    <NavigationContainer>
      <UserStore>
        <MyDrawerNavigator />
      </UserStore>
    </NavigationContainer>
  );
}

export default App;
