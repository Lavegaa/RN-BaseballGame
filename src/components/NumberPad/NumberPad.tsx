import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated
} from "react-native";

export default function NumberPad({
  numberPress,
  backspacePress,
  submitPress
}: {
  numberPress: (val: string) => void;
  backspacePress: () => void;
  submitPress: () => void;
}) {
  const [animatedValue, setanimatedValue] = useState(new Animated.Value(100));
  const [isModal, setIsModal] = useState(false);
  const modalPress = () => {
    if (isModal) {
      Animated.spring(animatedValue, {
        toValue: 100,
        velocity: 3,
        tension: 2,
        friction: 8
      }).start();
      setIsModal(false);
    } else {
      Animated.spring(animatedValue, {
        toValue: 380,
        velocity: 3,
        tension: 2,
        friction: 8
      }).start();
      setIsModal(true);
    }
  };
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animatedValue }] }]}
    >
      <TouchableHighlight style={styles.modal} onPress={modalPress}>
        <Text>모달</Text>
      </TouchableHighlight>
      <View style={styles.block}>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("1")}
        >
          <Text>1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("2")}
        >
          <Text>2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("3")}
        >
          <Text>3</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("4")}
        >
          <Text>4</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("5")}
        >
          <Text>5</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("6")}
        >
          <Text>6</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("7")}
        >
          <Text>7</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("8")}
        >
          <Text>8</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("9")}
        >
          <Text>9</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight style={styles.backspace} onPress={backspacePress}>
          <Text>지우기</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submit} onPress={submitPress}>
          <Text>제출</Text>
        </TouchableHighlight>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 300,
    bottom: 100,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#f5f5f5",
    alignItems: "flex-start"
  },
  modal: {
    width: "100%",
    height: 24,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: "blue"
  },
  block: {
    flex: 3,
    flexDirection: "row"
  },
  numbers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow"
  },
  submit: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow"
  },
  backspace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow"
  }
});
