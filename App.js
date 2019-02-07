import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  StackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Cat from "./src/screens/Cat";
import CategoriesView from "./src/components/CategoriesView";
import axios from "axios";
import Pages from "./src/screens/Pages";
import Today from "./src/screens/Today";
import Discover from "./src/screens/Discover";
import Search from "./src/screens/Search";

const ACCESS_TOKEN = "access_token";
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
      {
        this.navigation.push("Today");
      }
    } else {
      {
        this.navigation.push("Login");
      }
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
    const { authenticated } = this.state;

    return <AppStackNavigator/>
  }
}
const AppStackNavigator = createStackNavigator(
  {
    InternalFlow: {
      screen: StackNavigator({
        Login: { screen: LoginScreen },
        Signup: { screen: SignupScreen },
        //Today: {screen: Today},
        Cat: { screen: Cat },
        Discover: { screen: Discover },
        //CategoriesView: { screen: CategoriesView },
        Pages: { screen: Pages }
      })
    },
    InternalFlow2: {
      screen: StackNavigator({
        Cat: { screen: Cat },
        CategoriesView: { screen: CategoriesView }
      })
    },
    BasicTab: {
      screen: createBottomTabNavigator({
        Today: {
          screen: Discover
        },
        Cat: {
          screen: Cat
        },
        GoLive: {
          screen: Today
        },
        Search: {
          screen: Search
        },
        Pages: {
          screen: Pages
        }
      })
    }
  },
  {
    initialRouteKey: 'InternalFlow',
    navigationOptions: {
      header: null
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});
