import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated
} from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function NumberPad({
  isModal,
  modalPress,
  animatedValue,
  numberPress,
  backspacePress,
  submitPress
}: {
  isModal: boolean;
  modalPress: () => void;
  animatedValue: Animated.Value;
  numberPress: (val: string) => void;
  backspacePress: () => void;
  submitPress: () => void;
}) {
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animatedValue }] }]}
    >
      <View style={styles.modal}>
        <TouchableHighlight onPress={modalPress}>
          <View style={[{ alignSelf: "center" }]}>
            <Entypo size={20} name={isModal ? "chevron-up" : "chevron-down"} />
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("1")}
        >
          <Text style={styles.numText}>1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("2")}
        >
          <Text style={styles.numText}>2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.numbers, styles.last]}
          onPress={() => numberPress("3")}
        >
          <Text style={styles.numText}>3</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("4")}
        >
          <Text style={styles.numText}>4</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("5")}
        >
          <Text style={styles.numText}>5</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.numbers, styles.last]}
          onPress={() => numberPress("6")}
        >
          <Text style={styles.numText}>6</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("7")}
        >
          <Text style={styles.numText}>7</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.numbers}
          onPress={() => numberPress("8")}
        >
          <Text style={styles.numText}>8</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.numbers, styles.last]}
          onPress={() => numberPress("9")}
        >
          <Text style={styles.numText}>9</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.block}>
        <TouchableHighlight style={styles.backspace} onPress={backspacePress}>
          <Text style={styles.numText}>지우기</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submit} onPress={submitPress}>
          <Text style={styles.numText}>제출</Text>
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
    height: 30,
    justifyContent: "center",
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    borderBottomWidth: 1,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30
  },
  block: {
    flex: 3,
    flexDirection: "row"
  },
  numbers: {
    flex: 1,
    alignItems: "center",
    borderEndWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  last: {
    borderEndWidth: 0
  },
  numText: {
    fontSize: 20
  },
  submit: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  backspace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderEndWidth: 1
  }
});
