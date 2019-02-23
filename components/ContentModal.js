import React from "react";
import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";

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
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => onClose()}
        >
          <View
            style={{
              padding: 20,
              paddingTop: 30,
              backgroundColor: "#fff",
              height: height,
              width: width,
              borderRadius: 15
            }}
          >
            {children}
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ContentModal;
