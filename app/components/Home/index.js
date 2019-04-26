import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  RIght,
  Tab,
  Tabs,
  List,
  ListItem,
  Right,
  Button,
  Icon
} from "native-base";

import { createBottomTabNavigator } from "react-navigation";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

import CalorieCounter from "../CalorieCounter";
import Scheduling from "../Scheduling";
import Nutrition from "../Nutrition";
import WorkoutVideo from "../WorkoutVideo";
class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam("userName", "NO-ID");
    const password = navigation.getParam("password", "No-IDDefault");
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#f35300" }}
          androidStatusBarColor="#F57C00">
          <Body>
            <Title>FitnessGuideZone</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("login");
              }}
            >
              <Text style={{color:"#fff"}}>Log Out</Text>
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab
            style={{ backgroundColor: "#FFA726" }}
            tabStyle={{ backgroundColor: "#f35300" }}
            activeTabStyle={{ backgroundColor: "#f35300" }}
            heading="Workout"
          >
            <List style={{ backgroundColor: "#fff" }}>
              <WorkoutVideo />
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate("workouvideo");
                }}
              >
                <Text>Biceps</Text>
              </ListItem>
              <ListItem>
                <Text>Tricep</Text>
              </ListItem>
              <ListItem>
                <Text>Back</Text>
              </ListItem>
            </List>
          </Tab>
          <Tab
            style={{ backgroundColor: "#FFA726" }}
            tabStyle={{ backgroundColor: "#f35300" }}
            activeTabStyle={{ backgroundColor: "#f35300" }}
            heading="Diet"
          >
            <List style={{ backgroundColor: "#fff" }}>
              <ListItem>
                <Text>Muscle Gain</Text>
              </ListItem>
              <ListItem>
                <Text>Fat loss</Text>
              </ListItem>
            </List>
          </Tab>
        </Tabs>

        {/* <Text style={styles.welcome}>
          Username : {JSON.stringify(username)}
        </Text>
        <Text style={styles.welcome}>
          password : {JSON.stringify(password)}
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA726"
  },
  listItem: {},

  welcome: {
    fontSize: 15
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <IconFill name="home" color={tintColor} size={24} />
        )
      }
    },
    CalorieCounter: {
      screen: CalorieCounter,
      navigationOptions: {
        tabBarLabel: "Calorie Counter",
        tabBarIcon: ({ tintColor }) => (
          <IconFill name="calculator" color={tintColor} size={24} />
        )
      }
    },
    Scheduling: {
      screen: Scheduling,
      navigationOptions: {
        tabBarLabel: "Scheduling",
        tabBarIcon: ({ tintColor }) => (
          <IconFill name="schedule" color={tintColor} size={24} />
        )
      }
    },
    Nutrition: {
      screen: Nutrition,
      navigationOptions: {
        tabBarLabel: "Ntrition",
        tabBarIcon: ({ tintColor }) => (
          <IconFill name="apple" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: "#E65100",
      inactiveTintColor: "grey"
    }
  }
);
