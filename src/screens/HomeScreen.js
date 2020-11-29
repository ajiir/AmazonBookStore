import React, { useState, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Button,
} from "react-native";

import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import Search from "../components/Search";
import useCategory from "../Hooks/useCategory";
import CategoryBookList from "../components/CategoryBookList";
import Spinner from "../components/Spinner";
import MyHeaderButton from "../components/MyHeaderButton";
import UserContext from "../Contexts/UserContext";

const HomeScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSetSearch] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [categories, errorMessage, loading] = useCategory();
  const [refresh, setRefresh] = useState(false);

  const state = useContext(UserContext);

  if (route.params && route.params.deletedBook) {
    Alert.alert(route.params.deletedBook.name + " нэртэй номыг устгалаа! ");
    delete route.params.deletedBook;
    setRefresh(true);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
          <Item
            title="Цэс"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      title: state.userName
        ? "Сайн уу? : " + state.userName
        : "Амазон номын дэлгүүр",
    });
  }, [navigation, localSearchText, state.userName]);

  const searchBookFromServer = () => {
    setServerSearchText(localSearchText);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <Text
            style={{
              color: "green",
              margin: 20,
              justifyContent: "center",
              width: "100%",
            }}
            onPress={() => Linking.openURL("https://1234.mn/course/98")}
          >
            Энд дарж энэхүү аппын хийсэн сургалтыг үзээрэй!
          </Text>
          <Search
            value={localSearchText}
            onValueChange={setLocalSetSearch}
            onFinishEnter={searchBookFromServer}
          />

          {errorMessage && (
            <Text style={{ marginHorizontal: 20, color: "red" }}>
              {errorMessage}
            </Text>
          )}
          <ScrollView style={{ marginTop: 20 }}>
            {categories.map((category) => (
              <CategoryBookList
                refreshCategory={refresh}
                setRefresh={setRefresh}
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                key={category._id}
                style={{ marginVertical: 10 }}
                data={category}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
