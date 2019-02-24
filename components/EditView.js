import React from "react";
import {
  Slider,
  Text,
  Switch,
  View,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import Axios from "axios";

import style from "../style";

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
      <View style={style.flexContainer}>
        {/* Name and State */}
        <View style={[style.flexRow, { width: "100%" }]}>
          <View style={{ width: "70%" }}>
            <TextInput
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
              style={[style.textInput, style.heading2]}
            />
          </View>

          <View>
            <Switch
              value={this.state.state}
              onValueChange={val => this.setState({ state: val })}
            />
          </View>
        </View>

        {/* Color sliders */}
        <View style={{ width: "100%" }}>
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
            <Text style={style.heading3}>Red</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val => this.setState({ r0: Math.round(val) })}
              value={this.state.r0}
              style={{ width: "90%" }}
            />

            <Text style={style.heading3}>Green</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val => this.setState({ g0: Math.round(val) })}
              value={this.state.g0}
              style={{ width: "90%" }}
            />

            <Text style={style.heading3}>Blue</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val => this.setState({ b0: Math.round(val) })}
              value={this.state.b0}
              style={{ width: "90%" }}
            />

            <Text style={style.heading3}>Brightness</Text>
            <Slider
              minimumValue={0}
              maximumValue={255}
              onValueChange={val =>
                this.setState({ brightness: Math.round(val) })
              }
              value={this.state.brightness}
              style={{ width: "90%" }}
            />

            {/* Pattern */}
            <View style={{ width: "100%" }}>
              <Text style={style.heading3}>Pattern</Text>
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
        </View>

        {/* Save & Cancel */}
        <View style={[style.flexRow, { width: "100%" }]}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.saveNode();
                Axios.get(
                  `http://${this.props.apiAddress}:5000/node?id=${
                    this.state.id
                  }`
                ).then(res => console.log());
                this.props.onSubmit();
              }}
            >
              <Text style={[style.heading3, { fontWeight: "bold" }]}>Save</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => this.props.onSubmit()}>
              <Text style={[style.heading3, { fontWeight: "bold" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({});

export default EditView;
