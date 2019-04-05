/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

class ForgotPassword extends Component {

  constructor(){
    super();
    this.state = {
      _email:""
    };
  }

  static navigationOptions = {
    header: null
  };

  mailSend() {
    const { _email } = this.state;
    if (_email != "") {
      Alert.alert("Success", "Forgot Link sent to your email address");
      this.props.navigation.navigate("login");
    }else {
      Alert.alert("Error", "Please Enter Email address", [
        {
          text: "Okay"
        }
      ]);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.forgotText}>Reset Your Password</Text>
      <TextInput style={styles.inputBox}
        placeholder=" Enter Email Address"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        onChangeText = {text => this.setState({_email: text})}
        />
        <TouchableOpacity onPress = { ()=> this.mailSend(this)}
          style={styles.button}>
              <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <View style = {styles.signupTxt}>
          <Text style = {styles.signupTxt1}>Go Back to</Text>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("login");
          }}>
          <Text style={styles.signupTxt2}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFA726'
},

forgotText:{
  fontSize: 20,
  margin: 10,
  color:'#ffffff',
  textAlign:'left',
},

inputBox: {
  width:400,
  backgroundColor:'rgba(255, 255,255,0.2)',
  borderRadius: 10,
  paddingHorizontal:16,
  fontSize:16,
  color:'#ffffff',
  marginVertical: 10,
  marginTop:35
},
button: {
  width:400,
  backgroundColor:'#F57C00',
  borderRadius: 10,
  marginVertical: 10,
  paddingVertical: 13
},
buttonText: {
  fontSize:16,
  fontWeight:'500',
  color:'#ffffff',
  textAlign:'center'
},
signupTxt:{
    alignItems:'flex-start',
    paddingVertical:10,
    flexDirection:'row',
    textAlign:'left',
  },

  signupTxt1:{
    color:'#ffffff',
    fontSize:14,
    textAlign:'left',
    fontSize:18,
  },

  signupTxt2:{
    color:'#E65100',
    fontSize:16,
    marginLeft:3,
    textAlign:'left',
    fontSize:20,
    marginRight:200
  },

});
export default ForgotPassword;
