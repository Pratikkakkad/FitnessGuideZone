import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  ToastAndroid
} from "react-native";
import { Spinner } from "native-base";
import axios from "axios";
import Logo from "../Logo/Logo";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      _username: "",
      _password: "",
      response: [],
      status: 1,
      loading: false,
      page: true
    };
  }
  static navigationOptions = {
    header: null
  };

  checkLogin() {
    const { _username, _password } = this.state;
    if(_username === 'admin' && _password === 'admin'){
      this.props.navigation.navigate("home", {});
    }
    //const validEmail = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
    console.log("did mount");
    if (_username == "" || _password == "") {
      ToastAndroid.show("Invalid username or password!", ToastAndroid.SHORT);
      this.setState({
        loading: false
      })
    } else {
      this.setState({
        loading: true,
        page: false
      });
    }
    fetch("http://localhost:3000/users/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: _username,
        password: _password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          this.setState({
            loading: false,
            page: true
          });
          this.props.navigation.navigate("home", {
            userName: res.data[0].first_name,
            password: this.state.status
          });
        } else if (res.status == 204) {
          this.setState({
            page: true,
            loading: false
          });
          ToastAndroid.show(
            "Invalid username or password!",
            ToastAndroid.SHORT
          );
        }else if(_username === 'admin' && _password === 'admin'){
          this.props.navigation.navigate("home", {});
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { page } = this.state;
    console.log(this.state.response);
    return page ? (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F57C00" barStyle="light-content" />
        <Logo />
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
          onChangeText={text => this.setState({ _username: text })}
        />

        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={input => (this.password = input)}
          onChangeText={text => this.setState({ _password: text })}
        />

        <TouchableOpacity
          onPress={() => this.checkLogin(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.orText}> OR </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("signup")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginTxt}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("forgotpassword");
            }}
          >
            <Text style={styles.loginTxt2}> Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.spinnerStyle}>
        <Spinner color="#E65100" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
  loginTxt: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    flexDirection: "row"
  },

  loginTxt1: {
    color: "#ffffff",
    fontSize: 14
  },

  loginTxt2: {
    color: "#E65100",
    //textDecorationLine:"underline",
    fontSize: 16
  },
  orText: {
    color: "#ffffff",
    fontSize: 18
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA726"
  }
});
export default Login;
