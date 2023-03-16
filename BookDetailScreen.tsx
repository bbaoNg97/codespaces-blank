import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetail } from "./booksApi";
import { getBookDetailDone, getBookDetailError } from "./bookSlice";

interface BookDetailScreenProps {
  book: book.Book;
}

const BookDetailScreen = (props: BookDetailScreenProps): JSX.Element => {
  const selectedBookId = useSelector((state) => state.selectedBookId);
  const selectedBook = useSelector((state) => state.selectedBook);

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getBookDetail(selectedBookId));
    try {
      let response = await getBookDetail(selectedBookId);
      dispatch(getBookDetailDone(response));
    } catch (e) {
      dispatch(getBookDetailError());
      Alert.alert("Fetch books failed with error: ", e);
    }
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{selectedBook.title}</Text>
      <Text>{selectedBook.author}</Text>
      <Image src={selectedBook.coverImage} style={styles.image} />
      <Text>{selectedBook.description}</Text>
    </View>
  );
};

export default BookDetailScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
});
