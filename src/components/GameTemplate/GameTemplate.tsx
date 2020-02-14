import React, { useState } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { useGameDispatch, useGameState } from "../../contexts/GameContext";
import NumberList from "../NumberList";
import NumberPad from "../NumberPad";
import GameOver from "../GameOver";

export default function GameTemplate() {
  const [value, setValue] = useState("???");
  const [warning, setWarning] = useState("");
  const [animatedValue, setanimatedValue] = useState(new Animated.Value(100));
  const [flexValue, setFlexValue] = useState([4, 3]);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useGameDispatch();
  const gameState = useGameState();
  const modalPress = () => {
    if (isModal) {
      Animated.spring(animatedValue, {
        toValue: 100,
        velocity: 3,
        tension: 2,
        friction: 8
      }).start();
      setIsModal(false);
      setTimeout(() => {
        setFlexValue([4, 3]);
      }, 400);
    } else {
      Animated.spring(animatedValue, {
        toValue: 370,
        velocity: 3,
        tension: 2,
        friction: 8
      }).start();
      setIsModal(true);
      setFlexValue([6, 1]);
    }
  };
  const numberPress = (val: string) => {
    if (value === "???") {
      setValue(value.slice(0, -3) + val);
    }
    if (value.length < 3) {
      setValue(value + val);
    }
  };
  const backspacePress = () => {
    if (value !== "???") {
      if (value.length > 0) {
        setValue(value.slice(0, -1));
        if (value.length === 1) {
          setValue("???");
        }
      }
    }
  };
  const checkInput = (value: number[]): boolean => {
    let flag = true;
    if (value.length !== 3) {
      return false;
    }
    value.forEach((val, index) => {
      if (
        val === value[(index + 1) % 3] ||
        val === value[(index + 2) % 3] ||
        val === 0
      ) {
        flag = false;
      }
    });
    if (flag) {
      return true;
    } else {
      return false;
    }
  };
  const submitPress = () => {
    if (value !== "???") {
      const val = value
        .toString()
        .split("")
        .map(val => parseInt(val));
      if (checkInput(val)) {
        dispatch({ type: "CHECK", value: val });
        setValue("???");
        setWarning("");
      } else {
        setWarning("숫자를 1~9가 중복되지 않게 입력해주세요.");
      }
    } else {
      setWarning("숫자를 1~9가 중복되지 않게 입력해주세요.");
    }
  };
  if (gameState.correct) {
    return (
      <GameOver
        reset={() => dispatch({ type: "RESET" })}
        target={gameState.target}
        turn={gameState.totalTurn}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={[{ flex: 1, justifyContent: "center" }]}>
          <Text style={styles.text}>
            {gameState.totalTurn}회 {"  "}
            {value}, {gameState.target}
          </Text>
          {warning === "" || <Text>{warning}</Text>}
        </View>
        <View style={[{ flex: flexValue[0] }]}>
          <NumberList game={gameState.game} />
        </View>
        <View style={[{ flex: flexValue[1] }]}>
          <NumberPad
            isModal={isModal}
            modalPress={modalPress}
            animatedValue={animatedValue}
            numberPress={numberPress}
            backspacePress={backspacePress}
            submitPress={submitPress}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    backgroundColor: "#2A84FC"
  },
  text: {
    marginTop: 10,
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
