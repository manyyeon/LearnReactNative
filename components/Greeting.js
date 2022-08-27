import React from "react";
import { View, Text } from "react-native";

const Greeting = (props) => {
  return (
    <View>
      <Text>안녕하세요 {props.name}!</Text>
    </View>
  );
};

Greeting.defaultProps = {
  name: "리액트 네이티브",
};

export default Greeting;
