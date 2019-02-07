import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Cat from "./src/screens/Cat";
import CategoriesView from "./src/components/CategoriesView";
import axios from "axios";
import Pages from "./src/screens/Pages";

const ACCESS_TOKEN = "access_token";
let initalRoute = 'Login';
export default class App extends Component {
  constructor() {
    super();
    this.state = { token: "", authenticated: null };
  }

  componentWillMount() {
    this.getToken();
    //this.renderScreens();
  }

  renderScreens() {
    const { authenticated } = this.state;
    console.log("Authenticated State: ", authenticated);
    if (authenticated) {
      initalRoute = "First";
      console.log(initalRoute)
    } else {
      initalRoute = "Login";
    }
  }

  checkToken(token) {
    //const { authenticated } = this.state;
    axios
      .post("http://198.245.53.50:5000/api/users/check", {
        token: token
      })
      .then(response => {
        this.setState({ authenticated: response.data.authenticated });
      })
      .then(this.renderScreens.bind(this));
  }
  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      //this.setState({ token: token });
      this.checkToken(token);
      console.log("Token is", token);
      //this.getToken();
    } catch (error) {
      console.log("Cannot get token");
    }
  }

  render() {
    return <AppContainer />;
  }
}
const AppStackNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    First: { screen: MainScreen },
    Cat: { screen: Cat },
    CategoriesView: { screen: CategoriesView },
    Pages : {screen: Pages}
  },
  {
    initialRouteName: initalRoute
  }
);
//createAppContainer(AppStackNavigator);
const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
