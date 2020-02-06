import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import NumberList from "../NumberList";
import Input from "../Input";
import Submit from "../Submit";
import { GameContextProvider } from "../../contexts/GameContext";

export default function GameTemplate() {
  const [value, setValue] = useState("");
  return (
    <GameContextProvider>
      <View style={styles.container}>
        <Input value={value} setValue={setValue} />
        <NumberList />
        <Submit value={value} />
      </View>
    </GameContextProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
