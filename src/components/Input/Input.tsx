import React, { SetStateAction } from "react";
import { TextInput } from "react-native";

export default function Input({
  value,
  setValue
}: {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <TextInput
      style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
      returnKeyType={"go"}
      keyboardType={"numeric"}
      onChangeText={text => setValue(text)}
      value={value}
    />
  );
}
