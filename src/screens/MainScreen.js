import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Today from "./Today";
import Cat from "./Cat";
import Discover from "./Discover";
import Search from "./Search";
import Pages from "./Pages";

export default class MainScreen extends Component {

  render(){
    return;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
