import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { getBookDetail } from "./booksApi";

interface BookDetailProps {
  route: {
    params: {
      id: string;
    };
  };
}

const BooksDetail = (props: BookDetailProps): JSX.Element => {
  const books = useSelector((state) => state.books);
  const [bookDetail, setbookDetail] = useState<BookDetail>(undefined);
  useEffect(async () => {
    let response = await getBookDetail(props.route.params.id);
    setbookDetail(response);
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{bookDetail.title}</Text>
      <Text>{bookDetail.author}</Text>
      <Image src={bookDetail.coverImage} style={styles.image} />
      <Text>{bookDetail.description}</Text>
    </View>
  );
};

export default BooksDetail;

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
