import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainColor, lightColor, textColor, restApiUrl } from "../../Constants";
import * as Animatable from "react-native-animatable";
import FormSwitch from "../components/FormSwitch";

// Аппыг ажиллаж байхад нь дэлгэцэнд ил байхад нь сэрүүлэг үүсвэл яах ёстойг нь энд тохируулж байна.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

const SettingsScreen = (props) => {
  const [alarm, setAlarm] = useState(false);
  const [notificationsId, setNotificationsId] = useState(null);

  useEffect(() => {
    const notificationResponseReceivedListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Хэрэглэгч notification дээр дарлаа: ", response);
      }
    );

    const notificationReceivedListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert("Анхаар", notification.request.content.data.message, [
          {
            text: "Очиж үзэх",
            onPress: () => {
              props.navigation.navigate("Detail", {
                id: notification.request.content.data.id,
              });
            },
          },
          {
            text: "Татгалзах",
            onPress: () => {},
          },
        ]);
      }
    );

    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((result) => {
        if (result.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return result;
      })
      .then((result) => {
        if (result.status === "granted") {
          Notifications.getDevicePushTokenAsync().then((result) =>
            console.log("Expo result ", result.data)
          );
        }
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("notificationsId")
      .then((result) => {
        console.log("id", result);
        setNotificationsId(result);
      })
      .catch((err) => console.log(error));
    AsyncStorage.getItem("alarm")
      .then((result) => {
        setAlarm(JSON.parse(result).alarm);
      })
      .catch((err) => console.log(error));

    return () => {
      notificationResponseReceivedListener.remove();
      notificationReceivedListener.remove();
    };
  }, []);

  const toggleAlarm = () => {
    setAlarm((alarm) => {
      const newValue = !alarm;

      if (newValue) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Анхаар!",
            body: "Таны сонирхсон номын хямдрал дуусах гэж байна!",
            data: {
              id: "5fbd40a9fdf25a205c10b898",
              message: "Таны сонирхсон номын хямдрал дуусах гэж байна!",
            },
          },
          trigger: {
            seconds: 5,
            repeats: true,
          },
        })
          .then((id) => {
            console.log("alarm : ", id);
            setNotificationsId(id);
            AsyncStorage.setItem("notificationsId", id);
          })
          .catch((err) => console.log(err));
      } else {
        Notifications.cancelScheduledNotificationAsync(notificationsId)
          .then((result) => {
            setNotificationsId(null);
            AsyncStorage.removeItem("notificationsId");
            console.log("alarm cancelled");
          })
          .catch((err) => console.log(err));
      }

      AsyncStorage.setItem("alarm", JSON.stringify({ alarm: newValue }));
      return newValue;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 30, color: lightColor }}>
          Тохиргооны хэсэг
        </Text>
        <Text style={{ fontSize: 15, color: lightColor, marginTop: 10 }}>
          Та хямдралын тохиргоог оруулна уу.
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1000}
        style={{
          flex: 5,
          paddingHorizontal: 20,
          paddingVertical: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormSwitch
              label="Хямдрал дуусахыг сануулах эсэх"
              icon="clock"
              data={["Сануулна", "Сануулахгүй"]}
              value={alarm}
              onValueChange={toggleAlarm}
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
