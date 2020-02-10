import React from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { useGameState } from "../../contexts/GameContext";

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default function NumberList() {
  const gameState = useGameState();
  return (
    <View style={styles.container}>
      <FlatList
        data={gameState.game}
        renderItem={({ item }) => (
          <Item>
            {item.value} : strike-{item.strike} ball-{item.ball}
          </Item>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  item: {
    marginTop: 15,
    padding: 25,
    height: 68,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 28
  }
});
