import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello {this.state.email}</Text>
        <TouchableOpacity onPress={this.signOutUser}>
          <Text style={styles.outBtn}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outBtn: {
    width: 200,
    padding: 25,
    backgroundColor: "red",
    borderRadius: 4,
    textAlign: "center",
  },
});
