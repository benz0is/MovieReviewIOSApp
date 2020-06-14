import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";
export default function Category() {
  const [state, setState] = useState({
    s: "Enter a genre",
    results: [],
    selected: {},
    selectedSimular: [],
  });
  const apiurl = "https://api.themoviedb.org/";
  const myApi = "/genre/movie/list?api_key=<API_KEY>&language=en-US";

  const search = () => {
    axios(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US"
    ).then(({ data }) => {
      let results = data;
      console.log(data.results);
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a movie by its genre</Text>
      <TextInput
        style={styles.searchbox}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.id}
            onPress={() => {
              openPopup(result.id);
              simularMovies(result.id);
            }}
          >
            <View style={styles.result}>
              <Image
                source={{
                  uri: "https://image.tmdb.org/t/p/w500/" + result.poster_path,
                }}
                style={styles.searchImage}
                resizeMode="cover"
              />

              <Text style={styles.heading}>{result.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingTop: 70,
    backgroundColor: "gray",
  },
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 40,
    borderColor: "black",
  },
});
