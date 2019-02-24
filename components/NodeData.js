import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import style from "../style";

const NodeData = ({ node, onPress }) => {
  const alpha = (node.brightness / 255).toFixed(2);
  const stateLookup = {
    false: "OFF",
    true: "ON"
  };
  const patternLookup = {
    static: "Static",
    breathing: "Breathing",
    rainbow: "Rainbow"
  };
  return (
    <View style={{ height: 70, width: "100%" }}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          paddingLeft: 5,
          paddingRight: 15,
          backgroundColor: `rgba(${node.r0}, ${node.g0}, ${node.b0}, ${alpha})`
        }}
        onPress={() => onPress()}
      >
        <View style={style.flexRow}>
          <View>
            <Text style={style.heading2}>{node.name}</Text>
            <Text>{`${node.b0}, ${node.g0}, ${node.b0}`}</Text>
            <Text>{patternLookup[node.pattern]}</Text>
          </View>
          <View>
            <Text style={style.heading2}>{stateLookup[node.state]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NodeData;
