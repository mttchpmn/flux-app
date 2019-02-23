import React from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";

const ContentModal = ({
  visible,
  onClose,
  children,
  height = "60%",
  width = "80%"
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      onRequestClose={() => onClose()}
      visible={visible}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "space-between",
            height: height,
            width: width,
            padding: 20,
            paddingTop: 30,
            borderRadius: 15
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ContentModal;
