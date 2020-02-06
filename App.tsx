import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GameTemplate from "./src/components/GameTemplate/index";

export default function App() {
  return <GameTemplate />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
