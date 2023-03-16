import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  getBooksDone,
  getBooksError,
  selectBook,
  updateFavourite,
} from "./bookSlice";
import Icon from "react-native-vector-icons/FontAwesome";
interface BookItemProps {
  book: book.Book;
}

const BooksScreen = (): JSX.Element => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    dispatch(getBooks());
    try {
      const response = await fetch("https://example.com/api/books");
      const books: book.Book[] = await response.json();
      dispatch(getBooksDone(books));
    } catch (e) {
      dispatch(getBooksError());
      Alert.alert("Fetch books failed with error: ", e);
    }
  }

  const BookItem = ({ book }: BookItemProps) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            dispatch(selectBook(book.id));
            navigation.navigate("BooksDetail");
          }}
        >
          <Text>{book.title}</Text>
          <Text>Favourite:</Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(updateFavourite(book.id, book.isFavourited))
            }
          >
            <Icon
              name="rocket"
              size={30}
              color={book.isFavourited ? Colors.yellow : Colors.gray}
            />
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
