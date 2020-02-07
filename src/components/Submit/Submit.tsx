import React, { useState, SetStateAction } from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { useGameDispatch } from "../../contexts/GameContext";

export default function Submit({
  value,
  setValue
}: {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}) {
  const [warning, setWarning] = useState("");
  const dispatch = useGameDispatch();
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
  const handlePress = () => {
    const val = value
      .toString()
      .split("")
      .map(val => parseInt(val));
    if (checkInput(val)) {
      dispatch({ type: "CHECK", value: val });
      setValue("");
      setWarning("");
    } else {
      setWarning("각 자리수는 1~9의 수가 중복되지 않습니다.");
    }
  };
  return (
    <View>
      <TouchableHighlight onPress={handlePress}>
        <Text>입력</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          dispatch({ type: "RESET" });
        }}
      >
        <Text>다시하기</Text>
      </TouchableHighlight>
      {warning === "" || <Text>{warning}</Text>}
    </View>
  );
}
