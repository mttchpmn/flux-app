import React from "react";
import {
  AsyncStorage,
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import style from "./style";
import Axios from "axios";
import NodeData from "./components/NodeData";
import ContentModal from "./components/ContentModal";
import EditView from "./components/EditView";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiAddress: null,
      apiAddressSet: false, // binary switch to make sure we don't send GET request early
      nodesList: [],
      editModalOpen: false,
      selectedNode: {}
    };
  }

  componentDidMount() {
    // if (this.state.apiAddressSet) {
    //   console.log("componoent mount");
    //   this.getNodes();
    // }

    // Attempt to load API address from local storage when app boots
    try {
      AsyncStorage.getItem("apiAddress").then(apiAddress => {
        console.log("API address loaded from local storage:", apiAddress);
        this.setState({ apiAddress, apiAddressSet: true });
        this.getNodes();
      });
    } catch (err) {
      console.log(err);
    }
  }

  getNodes() {
    console.log("Fetching Nodes from API...");
    const addr = `http://${this.state.apiAddress}:5000/node/list`;

    Axios.get(addr).then(res => {
      this.setState({ nodesList: res.data });
      console.log("Nodes List: ", res.data);
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
      <View style={{ width: "100%" }}>
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ apiAddressSet: false })}
          >
            <Text>Flux API address: {this.state.apiAddress}</Text>
          </TouchableOpacity>
        </View>
        <Text>Current Flux Nodes:</Text>
        {this.state.nodesList.map(node => {
          return (
            <NodeData
              node={node}
              onPress={() =>
                this.setState({ selectedNode: node, editModalOpen: true })
              }
              key={node.id}
            />
          );
        })}
        <Text>Add New</Text>
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
        {/* Modal for editing Flux nodes */}
        <ContentModal
          visible={this.state.editModalOpen}
          height="80%"
          width="75%"
          onClose={() => this.setState({ editModalOpen: false })}
        >
          <EditView
            node={this.state.selectedNode}
            apiAddress={"192.168.1.69"}
            onSubmit={() => {
              this.setState({ editModalOpen: false });
              this.getNodes();
            }}
          />
        </ContentModal>

        {this.state.apiAddressSet ? this.nodeList() : this.apiAddressEntry()}
      </View>
    );
  }
}
