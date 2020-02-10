import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import NumberList from "../NumberList";
import NumberPad from "../NumberPad";
import { useGameDispatch } from "../../contexts/GameContext";

export default function GameTemplate() {
  const [value, setValue] = useState("???");
  const [warning, setWarning] = useState("");
  const dispatch = useGameDispatch();

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
        if (value === "") {
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
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      {warning === "" || <Text>{warning}</Text>}
      <NumberList />
      <NumberPad
        numberPress={numberPress}
        backspacePress={backspacePress}
        submitPress={submitPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
