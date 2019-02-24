import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const NodeData = ({ node, onPress }) => {
  const alpha = (node.brightness / 255).toFixed(2);
  const stateLookup = {
    0: "OFF",
    1: "ON"
  };
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: `rgba(${node.r0}, ${node.g0}, ${node.b0}, ${alpha})`
        }}
        onPress={() => onPress()}
      >
        <Text>{node.name}</Text>
        <Text>{stateLookup[node.state]}</Text>
        <Text>{`${node.b0}, ${node.g0}, ${node.b0}`}</Text>
        <Text>{node.pattern}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NodeData;
