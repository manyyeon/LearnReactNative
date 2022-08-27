import React, { useState } from "react";
import { Button } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import Box from "./components/Box";
import Counter from "./components/Counter";
import Greeting from "./components/Greeting";

const App = () => {
  const [count, setCount] = useState(0);
  const onIncrease = () => {
    setCount(count + 1);
  };
  const onDecrease = () => {
    setCount(count - 1);
  };
  return (
    <SafeAreaView style={styles.full}>
      <Counter count={count} onIncrease={onIncrease} onDecrease={onDecrease} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});

export default App;
