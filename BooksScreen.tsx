import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "./booksApi";
import { updateFavourite } from "./bookSlice";

interface BookItemProps {
  book: Book;
}

const BooksScreen = (): JSX.Element => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    getBooks();
  }, []);

  const changeFavourite = (id, favourite) => {
    dispatch(updateFavourite({ id, favourite }));
  };

  const BookItem = ({ book }: BookItemProps) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("BooksDetail", { id: book.id })}
        >
          <Text>{book.title}</Text>
          <Text>Favourite:</Text>
          <TouchableOpacity
            onPress={() => changeFavourite(book.id, !book.isFavourited)}
          >
            <Text>{book.isFavourited ? "Yes" : "No"}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={{ flexGrow: 1 }}
        data={books}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
