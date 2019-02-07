import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import axios from "axios";

const ACCESS_TOKEN = "access_token";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      hidePassword: true,
      token: ""
    };
  }

  async storeToken() {
    const { token } = this.state;
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
      console.log("Token Saved", token);
      //this.getToken();
    } catch (error) {
      console.log("Token cannot be saved");
    }
  }

  // async getToken() {
  //   try {
  //     let token = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     console.log("Token is", token);
  //     this.checkToken();
  //   } catch (error) {
  //     console.log("Cannot get token");
  //   }
  // }

  // checkToken(){
  //   const {token} = this.state
  //   axios
  //     .post("http://198.245.53.50:5000/api/users/check", {
  //       token: token
  //     })
  //     .then(response => console.log(response));
  // }

  static navigationOptions = {
    header: null
  };
  onLoginButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });

    axios
      .post("http://198.245.53.50:5000/api/sign-in", {
        email: email,
        password: password
      })
      .then(response => {
        console.log(response);
        this.setState({ token: response.data.token });
      })
      .then(this.storeToken.bind(this))
      .then(this.onLoginSuccess.bind(this))
      .then(() => {
        this.props.navigation.navigate("First");
      })
      .catch(this.onloginFailure.bind(this));
  }

  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false
    });
  }
  onloginFailure() {
    this.setState({ error: "Authentication Failed", loading: false });
    alert("Invalid Email or Password");
  }

  toggleShowButton() {
    // if (this.state.hidePassword) {
    //   this.setState({ hidePassword: false });
    // } else this.setState({ hidePassword: true });
    this.setState({ hidePassword: !this.state.hidePassword });
    //console.log('State: ', this.state.hidePassword)
  }

  toggleShow;

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginButtonPress.bind(this)}
        >
          <Text style={{ color: "white" }}> Login </Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Login</Text>
        <TextInput
          fontSize={20}
          placeholder="example@gmail.com"
          autoCorrect={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.text}
        />

        <TouchableOpacity
          onPress={this.toggleShowButton.bind(this)}
          style={styles.showButton}
        >
          <Text>{this.state.hidePassword ? "Show" : "Hide"}</Text>
        </TouchableOpacity>

        <TextInput
          fontSize={20}
          placeholder="Password"
          secureTextEntry={this.state.hidePassword}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {this.renderButton()}
        <Text
          style={styles.textStyle}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          Create Account
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  showButton: {
    position: "absolute",
    right: 30
  }
});
