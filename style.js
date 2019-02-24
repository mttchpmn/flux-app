import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  scrollContainer: {
    width: "100%"
  },
  scrollContainerContent: {
    flex: 1,
    alignItems: "center"
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },
  heading1: {
    fontSize: 20,
    fontWeight: "bold"
  },
  heading2: {
    fontSize: 18,
    fontWeight: "bold"
  },
  heading3: {
    fontSize: 16
  },
  content: {},
  textInput: {
    minHeight: 40,
    paddingLeft: 5,
    paddingBottom: 1,
    width: "100%"
  }
});

export default styles;
