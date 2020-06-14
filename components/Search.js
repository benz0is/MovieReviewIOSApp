import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native";

function Search({ handleInput, search }) {
  return (
    <View className="searchbox-wrap">
      <TextInput
        type="text"
        placeholder="Search for a movie..."
        className="searchbox"
        onChange={handleInput}
        onKeyPress={search}
      />
    </View>
  );
}

export default Search;
