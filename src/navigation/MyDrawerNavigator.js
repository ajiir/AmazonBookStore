import React, { useContext } from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStackNavigator from "./MyStackNavigator";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import DrawerContent from "../components/DrawerContent";
import BookAdd from "../screens/BookAdd";
import SettingsScreen from "../screens/SettingsScreen";
import PushNotification from "../screens/PushNotification";

const Drawer = createDrawerNavigator();

import UserContext from "../Contexts/UserContext";

export default () => {
  const state = useContext(UserContext);

  if (state.isLoading === true) {
    return <SplashScreen />;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Нүүр" component={MyStackNavigator} />
      {state.isLoggedIn ? (
        <>
          {state.userRole === "admin" && (
            <Drawer.Screen name="Шинэ ном нэмэх" component={BookAdd} />
          )}
          <Drawer.Screen name="Тохиргоо" component={SettingsScreen} />
          <Drawer.Screen name="Notification" component={PushNotification} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Бүртгүүлэх" component={SignUpScreen} />
          <Drawer.Screen name="Нэвтрэх" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};
