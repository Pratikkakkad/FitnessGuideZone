import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Login from "./app/components/Login";
import Signup from "./app/components/Signup";
import Home from "./app/components/Home";
import ForgotPassword from "./app/components/ForgotPassword";
import CalorieCounter from "./app/components/CalorieCounter";
import Scheduling from "./app/components/Scheduling";
import Nutrition from "./app/components/Nutrition";

export default createStackNavigator(
  {
    login: Login,
    signup: Signup,
    home: Home,
    forgotpassword: ForgotPassword,
    caloriecounter: CalorieCounter,
    scheduling: Scheduling,
    nutrition: Nutrition
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);