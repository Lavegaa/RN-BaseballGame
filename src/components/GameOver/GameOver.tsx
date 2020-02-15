import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  FlatList
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Game } from "../../contexts/GameContext";

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
        <Text style={styles.listTurn}>{turn}회</Text>
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

export default function GameOver({
  game,
  reset,
  target,
  turn
}: {
  game: Game[];
  reset: () => void;
  target: number[];
  turn: number;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.textBox}>
          <Text style={styles.turn}>{turn}회</Text>
          <Text style={styles.text}>{target}</Text>
        </View>
      </View>
      <View style={styles.listBox}>
        <View style={styles.list}>
          <Text style={styles.history}>HISTORY</Text>
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
        <View style={styles.btn}>
          <TouchableHighlight style={styles.button} onPress={reset}>
            <Text style={styles.btnText}>다시하기</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1
  },
  infoBox: {
    flex: 1,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: "#2A84FC"
  },
  listBox: {
    flex: 3,
    backgroundColor: "white"
  },
  textBox: {
    alignContent: "center"
  },
  turn: {
    marginTop: 80,
    marginStart: 20,
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  text: {
    marginStart: 20,
    color: "white",
    fontSize: 50,
    fontWeight: "bold"
  },
  button: {
    height: 70,
    width: 190,
    marginTop: 20,
    marginStart: 105,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#2A84FC"
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  history: {
    marginTop: 5,
    marginBottom: 5,
    marginStart: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  item: {
    flexDirection: "row",
    width: 300,
    height: 68,
    marginTop: 10,
    marginStart: 50,
    marginBottom: 5,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  listTurn: {
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
  },
  list: {
    flex: 8
  },
  btn: {
    flex: 2
  }
});
