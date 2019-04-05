import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ToastAndroid
} from "react-native";

import Logo from "../Logo/Logo";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
      contactNo: "",
      response: [],
      status: 1
    };
  }
  static navigationOptions = {
    header: null
  };

  doSignUp() {
    const { fname, lname, email, password, contactNo } = this.state;
    const validEmail = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
    const validNumber = "/[0-9]/g";
    const validName = "/^[A-Za-z]+$/";
    if (
      fname == "" ||
      lname == "" ||
      email == "" ||
      password == "" ||
      contactNo == ""
    ) {
      ToastAndroid.show("Fill All Field!", ToastAndroid.SHORT);
    } else if (password.length > 5) {
      ToastAndroid.show(
        "Password Length Shoud Be Greater than 5 !",
        ToastAndroid.SHORT
      );
    } else if (
      /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(email) &&
      /[0-9]/.test(contactNo) &&
      /^[A-Za-z]+$/.test(fname) &&
      /^[A-Za-z]+$/.test(lname)
    ) {
      console.log("did mount");
      fetch("https://pratikapi.herokuapp.com/users/signup", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: fname,
          last_name: lname,
          email: email,
          password: password,
          contact: contactNo
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 201) {
            this.props.navigation.navigate("login");
          } else if (
            res.msg == "Duplicate entry 'p@gmail.com' for key 'email'"
          ) {
            console.log("Email Id Already Registered!");
            ToastAndroid.show(
              "Email Id Already Registered!",
              ToastAndroid.SHORT
            );
          }
        })
        .catch(err => console.log(err));
    } else {
      ToastAndroid.show("Enter Valid Detail!", ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F57C00" barStyle="light-content" />
        <Logo />
        <TextInput
          style={styles.inputBox}
          placeholder="First Name"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={text => this.setState({ fname: text })}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="First Name"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={text => this.setState({ lname: text })}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={text => this.setState({ email: text })}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Mobile Number"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={text => this.setState({ contactNo: text })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          onChangeText={text => this.setState({ password: text })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          onChangeText={text => this.setState({ cpassword: text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.doSignUp(this)}
        >
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>

        <View style={styles.signupTxt}>
          <Text style={styles.signupTxt1}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("login");
            }}
          >
            <Text style={styles.signupTxt2}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  signupTxt: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    flexDirection: "row"
  },

  signupTxt1: {
    color: "#ffffff",
    fontSize: 14
  },

  signupTxt2: {
    color: "#E65100",
    textDecorationLine: "underline",
    fontSize: 17
  }
});
export default Signup;
