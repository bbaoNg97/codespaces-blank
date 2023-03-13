import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { setBooks } from '@core/services/bookSlice';
import { useSelector } from 'react-redux'

interface BookItemProps {
  book: Book;
}

const BooksScreen = (): JSX.Element => {
  const books = useSelector((state) => state.books);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    try {
      const response = await fetch('https://example.com/api/books');
      const books: Book[] = await response.json();
      setBooks(books);
    } catch (e) {
      Alert.alert('Fetch books failed with error: ', e);
    }
  }

  const BookItem = ({ book }: BookItemProps) => {
    return (
      <View>
        <View>
          <Text>{book.title}</Text>
          <Text>{book.isFavourited}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});
