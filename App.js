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
import Axios from "axios";

import style from "./style";
import NodeData from "./components/NodeData";
import ContentModal from "./components/ContentModal";
import EditView from "./components/EditView";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiAddress: null,
      apiAddressSet: false, // binary switch to make sure we don't send GET request early
      apiOffline: false,
      nodesList: [],
      idModalOpen: false,
      editModalOpen: false,
      selectedNode: {},
      newNodeId: "",
      defaultNode: {
        id: null,
        state: 1,
        name: "New Node",
        r0: 0,
        g0: 180,
        b0: 255,
        brightness: 200,
        pattern: "static"
      }
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

    Axios.get(addr)
      .then(res => {
        this.setState({ nodesList: res.data });
        console.log("Nodes List: ", res.data);
      })
      .catch(err => {
        console.log("ERROR: ", err);
        this.setState({ apiOffline: true });
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
      <View style={{ width: "100%", height: "100%" }}>
        {this.state.apiOffline ? (
          <Text>Can't contact FLUX API</Text>
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-start",
              alignContent: "center",
              marginTop: 30
            }}
          >
            <Text style={style.title}>FLUX</Text>

            {/* Nodes List */}
            <View style={{ marginTop: 50 }}>
              <Text style={[style.heading2, { textAlign: "center" }]}>
                Available FLUX Nodes:
              </Text>
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
            </View>

            <View style={{ width: "80%", marginTop: 15, alignSelf: "center" }}>
              <Button
                title="Add New"
                onPress={() => this.setState({ idModalOpen: true })}
              />
            </View>

            {/* Edit API button */}
            <View
              style={{
                marginTop: 80,
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ apiAddressSet: false })}
              >
                <Text style={{ textAlign: "center" }}>Edit API address</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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

        {/* Modal for adding new Flux nodes */}
        <ContentModal
          visible={this.state.idModalOpen}
          height="50%"
          width="60%"
          onClose={() => this.setState({ idModalOpen: false })}
        >
          <View>
            <Text>Enter ID of new FLUX Node</Text>
            <TextInput
              onChangeText={text => this.setState({ newNodeId: text })}
              placeholder=""
              value={this.state.newNodeId}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ idModalOpen: false });
                  const newNode = this.state.defaultNode;
                  newNode.id = this.state.newNodeId;
                  this.setState({
                    selectedNode: newNode,
                    newNodeId: "",
                    editModalOpen: true
                  });
                }}
              >
                <Text>Add Node</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ContentModal>

        {this.state.apiAddressSet ? this.nodeList() : this.apiAddressEntry()}
      </View>
    );
  }
}
