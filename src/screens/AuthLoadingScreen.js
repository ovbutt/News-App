import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import axios from "axios";

const ACCESS_TOKEN = "access_token";
//let authenticated;
export default class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this.state = { token: "", authenticated: true };
    this.getToken();
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

  checkToken(token) {
    const { authenticated } = this.state;
    axios
      .post("http://198.245.53.50:5000/api/users/check", {
        token: token
      })
      .then(response => {
        console.log("Authenticated:", response.data.authenticated);
        //this.setState({ authenticated: response.data.authenticated });
         let authenticated = response.data.authenticated
         this.renderScreen(authenticated)
      })
    //   .then(() => {
    //     console.log("Authenticated State:", authenticated);
    //     this.props.navigation.navigate(authenticated ? "App" : "Auth");
    //   });
  }

  renderScreen(authenticated){
    {this.props.navigation.navigate(authenticated ? "App" : "Auth")}
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
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
