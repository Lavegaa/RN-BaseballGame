import React from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { useGameState } from "../../contexts/GameContext";

const Item = ({ children }: { children: React.ReactNode }) => {
  return <Text>{children}</Text>;
};

export default function NumberList() {
  const gameState = useGameState();
  return (
    <View style={styles.container}>
      <Text>{gameState.target}</Text>
      <FlatList
        data={gameState.game}
        renderItem={({ item }) => (
          <Item>
            {item.value} : strike-{item.strike} ball-{item.ball}
          </Item>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
