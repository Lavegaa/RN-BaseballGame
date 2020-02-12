import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";

export default function GameOver({
  reset,
  target,
  turn
}: {
  reset: () => void;
  target: number[];
  turn: number;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {turn}회 {target}
      </Text>
      <TouchableHighlight onPress={reset}>
        <Text style={styles.text}>다시하기</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
