import React from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { useGameState } from "../../contexts/GameContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({
  value,
  strike,
  ball
}: {
  value: number;
  strike: number;
  ball: number;
}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{value}</Text>
      <View>
        <View style={styles.sbBox}>
          <Text>STRIKE</Text>
          <Count count={strike} color="#FFBB00" />
        </View>
        <View style={styles.sbBox}>
          <Text>BALL</Text>
          <Count count={ball} color="#1DDB16" />
        </View>
      </View>
    </View>
  );
};

const Count = ({ count, color }: { count: number; color: string }) => {
  return (
    <View style={styles.count}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle"
        color={count > 0 ? color : "#D5D5D5"}
      />
      <MaterialCommunityIcons
        name="checkbox-blank-circle"
        color={count > 1 ? color : "#D5D5D5"}
      />
      <MaterialCommunityIcons
        name="checkbox-blank-circle"
        color={count > 2 ? color : "#D5D5D5"}
      />
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
          <Item value={item.value} strike={item.strike} ball={item.ball} />
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
    width: "90%",
    height: 68,
    flexDirection: "row",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    marginEnd: 20
  },
  count: {
    flexDirection: "row"
  },
  sbBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
