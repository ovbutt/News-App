import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground,
  ScrollView
} from "react-native";
import axios from "axios";
import Today from "./Today";

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

  getTokenFromLoginRequest() {
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
      .then(this.storeToken.bind(this));
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
          .then(() => this.props.navigation.navigate("App"))
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
        <Text style={{ color: "#003366", fontSize: 18, fontWeight: '700' }}> Sign Up </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <ImageBackground
        source={require("../../thum/signupWallpaper.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
      <ScrollView>
        <View style={styles.container}>
          <Text style={{color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: 50, marginTop: 120}}>Sign Up</Text>
          <TextInput
            fontSize={20}
            placeholder="Full Name"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={fullName => this.setState({ fullName })}
            value={this.state.fullName}
            placeholderTextColor="white"
            style={{color: 'white'}}
              selectionColor='white'
              underlineColorAndroid='white'
            
          />
          <TextInput
            fontSize={20}
            placeholder="example@gmail.com"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholderTextColor="white"
            style={{color: 'white'}}
              selectionColor='white'
              underlineColorAndroid='white'
          />
          <TextInput
            fontSize={20}
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholderTextColor="white"
            style={{color: 'white'}}
            selectionColor='white'
            underlineColorAndroid='white'
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
            placeholderTextColor="white"
            style={{color: 'white'}}
              selectionColor='white'
              underlineColorAndroid='white'
          />

          {this.renderButton()}
          {/* <Text
          style={styles.textStyle}
          onPress={() => this.props.navigation.goBack()}
        >
          Log In
        </Text> */}
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ color: "white",  fontSize: 18, fontWeight: '400' }}> Log In </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  textStyle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff"
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
    justifyContent: 'center',
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 25,
    // paddingLeft: 30,
    // paddingRight: 30,
    height: 40,
    width: 250,
    marginTop: 80
  },
  button2: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#003366",
    // padding: 10,
    borderRadius: 25,
    // paddingLeft: 30,
    // paddingRight: 30,
    marginTop: 10,
    height: 40,
    width: 250,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});
