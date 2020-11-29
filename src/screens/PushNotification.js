import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import * as Notifications from "expo-notifications";
import FormText from "../components/FormText";
import MyButton from "../components/MyButton";

const PushNotification = () => {
  const [title, setTitle] = React.useState("Сайн байна уу?");
  const [message, setMessage] = React.useState("Ном хямдарлаа!");
  const [myToken, setMyToken] = React.useState("");

  React.useEffect(() => {
    Notifications.getExpoPushTokenAsync().then((result) => {
      console.log("Push token : ", result.data);
      setMyToken(result.data);
    });
  }, []);

  const send = async () => {
    const msg = {
      to: "ExponentPushToken[IgNWiZATHWF28UnQyYhKuj]",
      sound: "default",
      title: title,
      body: message,
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FormText
        label="Энэ утасны токен: "
        icon="message-circle"
        value={myToken}
      />
      <FormText
        label="Илгээх утасны токенийг оруулна уу: "
        icon="message-circle"
        value="ExponentPushToken[IgNWiZATHWF28UnQyYhKuj]"
      />

      <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold" }}>
        Гарчиг:
      </Text>

      <TextInput
        style={{
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
        }}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold" }}>
        Илгээх текст:
      </Text>

      <TextInput
        style={{
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
        }}
        value={message}
        onChangeText={setMessage}
      />

      <MyButton title="Илгээ" onPress={send} />
      <MyButton
        title="Буцах"
        onPress={() => {
          console.log("Back");
        }}
      />
    </View>
  );
};

export default PushNotification;

const styles = StyleSheet.create({});
