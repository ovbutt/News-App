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
      fullName: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      token: ''
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

  getTokenFromLoginRequest (){
    const { email, password } = this.state;

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
  }

  //state = { fullName: "", email: "", password: "", loading: false };

  static navigationOptions = {
    header: null
  };
  onSignupButtonPress() {
    const {
      fullName,
      email,
      password,
      password_confirmation,
      loading
    } = this.state;
    console.log(
      "email: ",
      email,
      "fullName: ",
      fullName,
      "password: ",
      password
    );

    this.setState({ loading: true });

    if (password === password_confirmation) {
      if (password.length >= 6) {
        axios
          .post("http://198.245.53.50:5000/api/signup", {
            fullName: fullName,
            email: email,
            password: password
          })
          .then(response => console.log(response))
          .then(this.getTokenFromLoginRequest.bind(this))
          .then(this.onSignupSuccess.bind(this))
          .then(() => this.props.navigation.navigate('First'))
          .catch(this.onSignupFailure.bind(this));
      } else {
        alert("Password must be atleast 6 characters ");
        this.setState({ loading: false });
      }
    } else {
      alert("Password does not match");
      this.setState({ loading: false });
    }
  }
  onSignupSuccess() {
    
    this.setState({
      fullName: "",
      email: "",
      password: "",
      loading: false
    });
    
  }
  onSignupFailure() {
    this.setState({
      loading: false
    });
    alert("SignUp Failed");
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.onSignupButtonPress.bind(this)}
      >
        <Text style={{ color: "white" }}> SignUp </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Singup</Text>
        <TextInput
          fontSize={20}
          placeholder="Full Name"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={fullName => this.setState({ fullName })}
          value={this.state.fullName}
        />
        <TextInput
          fontSize={20}
          placeholder="example@gmail.com"
          autoCorrect={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          fontSize={20}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          fontSize={20}
          placeholder="Confirm Password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={password_confirmation =>
            this.setState({ password_confirmation })
          }
          value={this.state.password_confirmation}
        />
        {this.renderButton()}
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
  }
});
