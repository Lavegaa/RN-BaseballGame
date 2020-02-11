import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";

export default function GameOver({
  reset,
  target
}: {
  reset: () => void;
  target: string;
}) {
  return (
    <View>
      <Text>{target}</Text>
      <TouchableHighlight onPress={reset}>
        <Text>다시하기</Text>
      </TouchableHighlight>
    </View>
  );
}
