import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Book from "./Book";
import useBooks from "../Hooks/useBooks";
import Spinner from "./Spinner";

const CategoryBookList = ({
  data,
  style,
  searchLocalValue,
  searchServerValue,
  refreshCategory,
  setRefresh,
}) => {
  const [books, errorMessage, searchBook, loading] = useBooks(
    data._id,
    searchServerValue,
    refreshCategory,
    setRefresh
  );

  const filteredBooks = books.filter((el) =>
    el.name.toLowerCase().includes(searchLocalValue.toLowerCase())
  );

  return (
    <View style={{ ...style }}>
      <Text
        style={{
          marginLeft: 15,
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        {data.name} - {filteredBooks.length}
      </Text>
      <Text style={{ marginLeft: 15 }}>{data.description}</Text>
      {errorMessage && (
        <Text style={{ marginLeft: 15, color: "red" }}>{errorMessage}</Text>
      )}

      {loading && <Spinner showText={false} />}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredBooks}
        keyExtractor={(book) => book.name}
        renderItem={({ item }) => <Book data={item} />}
      />
    </View>
  );
};

export default CategoryBookList;

const styles = StyleSheet.create({});
