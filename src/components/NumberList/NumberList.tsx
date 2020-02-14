import React from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { Game } from "../../contexts/GameContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({
  turn,
  value,
  strike,
  ball
}: {
  turn: number;
  value: number;
  strike: number;
  ball: number;
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.turnBox}>
        <Text style={styles.turn}>{turn}회</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <View>
        <View style={styles.sbBox}>
          <Text style={styles.sbText}>STRIKE</Text>
          <Count count={strike} color="#FFBB00" />
        </View>
        <View style={styles.sbBox}>
          <Text style={styles.sbText}>BALL</Text>
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

export default function NumberList({ game }: { game: Game[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={game}
        renderItem={({ item }) => (
          <Item
            turn={item.turn}
            value={item.value}
            strike={item.strike}
            ball={item.ball}
          />
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
  turnBox: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 15,
    borderEndWidth: 1
  },
  turn: {
    fontSize: 18,
    marginEnd: 10
  },
  value: {
    paddingStart: 5,
    paddingEnd: 5,
    marginEnd: 15,
    fontSize: 24,
    fontWeight: "bold"
  },
  count: {
    flexDirection: "row"
  },
  sbBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  sbText: {
    width: 50
  }
});
