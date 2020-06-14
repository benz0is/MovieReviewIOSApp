import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Image,
  Modal,
} from "react-native";
import * as firebase from "firebase";

export default function HomeScreen() {
  const [state, setState] = useState({
    results: [],
    selected: {},
    upcomingmovies: [],
  });
  const apiurl =
    "https://api.themoviedb.org/3/movie/popular?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US&/?_limit=10";
  const movieApi = "https://api.themoviedb.org/3/movie/";
  const myApi = "?api_key=a90e2347b00a19f2b339bbd1c3699ed9";

  const upcomingApi =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US&page=1";

  function search() {
    axios(apiurl).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  }
  const openPopup = (id) => {
    axios(movieApi + id + myApi).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  function searchUpcomMov() {
    axios(upcomingApi).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return { ...prevState, upcomingmovies: results };
      });
    });
  }
  useEffect(() => {
    searchUpcomMov();
    search();
    console.log("Does it work");
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Most popular movies</Text>
          <ScrollView style={styles.results} horizontal={true}>
            {state.results.slice(0, 10).map((result) => (
              <TouchableHighlight
                key={result.id}
                onPress={() => openPopup(result.id)}
              >
                <View style={styles.result}>
                  <Image
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + result.poster_path,
                    }}
                    style={styles.searchImage}
                    resizeMode="contain"
                  />

                  <Text style={styles.heading}>{result.title}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
        <View style={styles.upcomingMov}>
          <Text style={styles.header}>Upcoming movies</Text>
          <ScrollView style={styles.results} horizontal={true}>
            {state.upcomingmovies.slice(0, 10).map((result) => (
              <TouchableHighlight
                key={result.id}
                onPress={() => openPopup(result.id)}
              >
                <View style={styles.result}>
                  <Image
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + result.poster_path,
                    }}
                    style={styles.searchImage}
                    resizeMode="contain"
                  />

                  <Text style={styles.heading}>{result.title}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.title != "undefined" ? true : false}
      >
        <ScrollView style={styles.popContainer}>
          <Image
            source={{
              uri:
                "https://image.tmdb.org/t/p/w500/" + state.selected.poster_path,
            }}
            style={styles.popupImage}
          />
          <View style={styles.popup}>
            <Text style={styles.poptitle}>Title:{state.selected.title}</Text>
            <Text style={styles.rating}>
              Rating:{state.selected.vote_average}
            </Text>
            <Text style={styles.overview}>
              Overview:{state.selected.overview}
            </Text>
          </View>
          <TouchableHighlight
            onPress={() =>
              setState((prevState) => {
                return { ...prevState, selected: {} };
              })
            }
          >
            <View>
              <Text style={styles.closebtn}>close</Text>
              <View style={styles.gap}></View>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    height: 1000,
  },
  header: {
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
  },
  result: {
    width: "100%",
    borderColor: "yellow",
  },
  heading: {
    fontSize: 20,
    backgroundColor: "white",
    fontWeight: "700",
    maxWidth: 150,
  },
  searchImage: {
    width: 150,
    height: 250,
  },
  popContainer: {
    position: "relative",
    top: 100,
  },
  poptitle: {
    fontWeight: "700",
    fontSize: 40,
  },
  rating: {
    fontWeight: "700",
    fontSize: 30,
  },
  popupImage: {
    height: 500,
    width: "100%",
  },
  overview: {
    fontSize: 20,
  },
  closebtn: {
    backgroundColor: "red",
    fontSize: 40,
    borderRadius: 5,
    textAlign: "center",
    paddingBottom: 50,
  },
  gap: {
    padding: 50,
  },
  results: {
    height: 700,
  },
  upcomingMov: {
    position: "absolute",
    top: 400,
    left: 0,
    right: 0,
  },
});
