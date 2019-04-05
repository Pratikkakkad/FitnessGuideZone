import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image style={{width:140, height: 120,marginTop:30}}
      source={require('../FGZ.png')} />
      <Text style={styles.welcome}>Fitness Zone</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#ffffff'
  },


});
