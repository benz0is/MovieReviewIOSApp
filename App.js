import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createBottomTabNavigator,
  createTabNavigator,
} from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import * as firebase from "firebase";
import LoadingScreen from "./components/LoadingScreen.js";
import MovieScreen from "./components/MovieScreen.js";
import ProfileScreen from "./components/ProfileScreen.js";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyC0l5kYvLby3jNR_I81w4HOyt5oYBoXaes",
  authDomain: "movieapp-7a7d9.firebaseapp.com",
};
firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor} />
        ),
      },
    },
    Movie: {
      screen: MovieScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" size={24} color={tintColor} />
        ),
      },
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray",
    },
  }
);

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    { initialRouteName: "Loading" }
  )
);
