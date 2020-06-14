import React from "react";

import Result from "./Result";
import { View } from "react-native";

function Results({ results, openPopup }) {
  return (
    <View className="results">
      {results.map((result) => (
        <View key={result.imdbID} result={result} openPopup={openPopup} />
      ))}
    </View>
  );
}

export default Results;
