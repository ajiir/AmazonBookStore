import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useHeaderHeight } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import useBook from "../Hooks/useBook";
import UserContext from "../Contexts/UserContext";
import MyButton from "../components/MyButton";
import { restApiUrl } from "../../Constants";

const BookDetailScreen = (props) => {
  const { id } = props.route.params;
  const [book, error, deleteBook] = useBook(id);

  const height = useHeaderHeight();

  const state = useContext(UserContext);

  const deleteOneBook = () => {
    Alert.alert("Анхаар!", "Та энэ номыг устгахдаа итгэлтэй байна уу?", [
      {
        text: "Татгалзах",
        onPress: () => {},
      },
      {
        text: "Тийм, устга!",
        onPress: () => {
          deleteBook(book._id)
            .then((result) => {
              props.navigation.navigate("Home", {
                deletedBook: result.data.data,
              });
            })
            .catch((err) => {
              Alert.alert(err.response.data.error.message);
            });
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          style={{ marginRight: 20 }}
          name="menu"
          size={25}
          color="white"
          onPress={() => props.navigation.toggleDrawer()}
        />
      ),
    });
  }, [props.navigation]);

  if (error) {
    return (
      <Text style={{ color: "red", margin: 30 }}>Алдаа гарлаа! {error}</Text>
    );
  }

  if (!book) {
    return null;
  }

  console.log(restApiUrl + "/upload/" + book.photo);

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      {book.photo.startsWith("/") ? (
        <Image
          style={{ width: 300, height: 400, alignSelf: "center" }}
          source={{ uri: "https://data.internom.mn/media/images" + book.photo }}
        />
      ) : (
        <Image
          style={{ width: 300, height: 400, alignSelf: "center" }}
          source={{ uri: restApiUrl + "/upload/" + book.photo }}
        />
      )}

      <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
        {book.name}
      </Text>
      <Text style={{ textAlign: "justify", marginBottom: 10 }}>
        {book.content}
      </Text>
      <MyButton
        style={{ marginBottom: 5 }}
        onPress={() => props.navigation.goBack()}
        title="Буцах"
      />

      {state.userRole === "admin" && (
        <MyButton onPress={deleteOneBook} title="Энэ номыг устгах" />
      )}
    </ScrollView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({});
