import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid
} from "react-native";

import RadioButton from "radio-button-react-native";

import Logo from "../Logo/Logo";

class CalorieCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      height: "",
      weight: "",
      value: 0,
      calories: ""
    };
  }

  static navigationOptions = {
    header: null
  };

  handleOnPress(value) {
    this.setState({ value: value });
  }

  countCalories() {
    var age = parseFloat(this.state.age);
    var height = parseFloat(this.state.height);
    var weight = parseFloat(this.state.weight);
    var result;

    if(age == "" || height =="" || weight == ""){
      ToastAndroid.show(
        "Fill All Field!",
        ToastAndroid.SHORT
      );
    }else if(/[0-9]/.test(age) && /[0-9]/.test(height) && /[0-9]/.test(weight)){
      if (this.state.value == 0) {
        result = parseInt(
          weight * 13.397 + height * 4.799 - age * 5.677 + 88.362
        );
      } else if (this.state.value == 1) {
        result = parseInt(weight * 10 + height * 6.25 - age * 5 - 161);
      }
      this.setState({
        calories: result
      });
    }else {
      ToastAndroid.show(
        "Enter Valid Values!",
        ToastAndroid.SHORT
      );
    }

    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          <StatusBar backgroundColor="#F57C00" barStyle="light-content" />
          <Logo />
          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.setState({ age: text })}
            value={this.state.age}
            placeholder="Age"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
          />

          <Text style={styles.genderTitle}>Gender:</Text>

          <View style={styles.genderBox}>
            <RadioButton
              currentValue={this.state.value}
              value={0}
              onPress={this.handleOnPress.bind(this)}
            >
              <Text style={styles.genderText}>Male</Text>
            </RadioButton>

            <RadioButton
              currentValue={this.state.value}
              value={1}
              onPress={this.handleOnPress.bind(this)}
            >
              <Text style={styles.genderText}>Female</Text>
            </RadioButton>
          </View>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.setState({ height: text })}
            value={this.state.height}
            placeholder="Height in cm"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
          />

          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.setState({ weight: text })}
            value={this.state.weight}
            placeholder="Weight in kg"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.countCalories(this)}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          <Text style={styles.calText}>
            Your Daily calorie Intake: {this.state.calories}{" "}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA726"
  },

  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA726"
  },

  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: "#F57C00",
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },

  calText: {
    flex: 1,
    fontSize: 18,
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "flex-start"
  },

  genderText: {
    fontSize: 18,
    color: "#ffffff",
    marginRight: 30
  },

  genderBox: {
    flexDirection: "row",
    marginVertical: 10
  },
  genderTitle: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "left",
    marginRight: 215
  }
});
export default CalorieCounter;
