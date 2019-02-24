import React from "react";
import {
  Slider,
  Text,
  Switch,
  View,
  Picker,
  TouchableOpacity,
  TextInput
} from "react-native";
import Axios from "axios";

class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.node;
  }

  saveNode() {
    console.log("Saving Node to Flux api...");
    const addr = `http://${this.props.apiAddress}:5000/node?id=${
      this.state.id
    }`;
    console.log(addr);
    console.log(this.state);
    Axios.post(addr, this.state);
  }

  render() {
    return (
      <View>
        <Text>Edit Node</Text>
        <Text>Name</Text>
        <TextInput
          onChangeText={text => this.setState({ name: text })}
          value={this.state.name}
        />
        <Text>State</Text>
        <Switch
          value={this.state.state}
          onValueChange={val => this.setState({ state: val })}
        />
        <View
          style={{
            backgroundColor: `rgba(${this.state.r0}, ${this.state.g0}, ${
              this.state.b0
            }, ${this.state.brightness})`,
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center"
          }}
        />
        <View>
          <View>
            <Text>Red</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val => this.setState({ r0: Math.round(val) })}
              value={this.state.r0}
              style={{ width: "90%" }}
            />

            <Text>Green</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val => this.setState({ g0: Math.round(val) })}
              value={this.state.g0}
              style={{ width: "90%" }}
            />

            <Text>Blue</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val => this.setState({ b0: Math.round(val) })}
              value={this.state.b0}
              style={{ width: "90%" }}
            />

            <Text>Brightness</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val =>
                this.setState({ brightness: Math.round(val) })
              }
              value={this.state.brightness}
              style={{ width: "90%" }}
            />

            <Text>Pattern</Text>
            <Picker
              selectedValue={this.state.pattern}
              style={{ width: "90%" }}
              onValueChange={val => this.setState({ pattern: val })}
              mode={"dropdown"}
            >
              <Picker.Item label="Static" value="static" />
              <Picker.Item label="Breathing" value="breathe" />
              <Picker.Item label="Rainbow" value="rainbow" />
            </Picker>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.saveNode();
              Axios.get(
                `http://${this.props.apiAddress}:5000/node?id=${this.state.id}`
              ).then(res => console.log());
              this.props.onSubmit();
            }}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => this.props.onSubmit()}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default EditView;
