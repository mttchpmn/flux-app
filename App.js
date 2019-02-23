import React from "react";
import {
  AsyncStorage,
  Alert,
  Button,
  Text,
  TextInput,
  View
} from "react-native";
import style from "./style";
import Axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiAddress: null,
      apiAddressSet: false, // binary switch to make sure we don't send GET request early
      nodesList: [],
      selectedNode: {}
    };
  }

  componentDidMount() {
    try {
      AsyncStorage.getItem("apiAddress").then(apiAddress => {
        console.log("API address loaded from local storage:", apiAddress);
        this.setState({ apiAddress });
      });
    } catch (err) {
      console.log(err);
    }
    if (this.state.apiAddressSet) {
      this.getNodes();
    }
  }

  getNodes() {
    console.log("Fetching Nodes from API...");
    const addr = `http://${this.state.apiAddress}:5000/node/list`;
    Axios.get(addr).then(res => {
      this.setState({ nodesList: res.data });
    });
  }

  saveApiAddress() {
    try {
      AsyncStorage.setItem("apiAddress", this.state.apiAddress).then(res =>
        console.log("API address saved to local storage")
      );
      Alert.alert(
        "Success!",
        `API address saved successfully`,
        [{ text: "OK", onPress: () => console.log("OK Pressed.") }],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert(
        "Error",
        `Error saving API address`,
        [{ text: "OK", onPress: () => console.log("OK Pressed.") }],
        { cancelable: false }
      );
    }
  }

  nodeList() {
    return (
      <View>
        <Text>Nodes</Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }

  apiAddressEntry() {
    return (
      <View>
        <Text>Enter Flux API Address:</Text>

        <TextInput
          onChangeText={text => this.setState({ apiAddress: text })}
          placeholder=""
          value={this.state.apiAddress}
        />

        <Button
          title="Submit"
          onPress={() => {
            this.setState({ apiAddressSet: true });
            this.saveApiAddress();
            this.getNodes();
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={style.flexContainer}>
        {this.state.apiAddressSet ? this.nodeList() : this.apiAddressEntry()}
      </View>
    );
  }
}
