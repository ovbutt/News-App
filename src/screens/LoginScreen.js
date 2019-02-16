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
import Today from './Today'
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
        this.props.navigation.navigate("App");
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

 // toggleShow;

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginButtonPress.bind(this)}
        >
          <Text style={{ color: "#003366", fontSize: 18, fontWeight: '700' }}> Log In </Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../../thum/loginwallpaper.png')}
        style={{height: '100%', width: '100%'}}
      >
      <ScrollView>
      <View style={styles.container}>
        <Text style={{color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: 50, marginTop: 150}}>Log In</Text>
        <TextInput
          fontSize={20}
          placeholder="example@gmail.com"
          autoCorrect={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.text}
          placeholderTextColor="white"
            style={{color: 'white'}}
        />

        <TouchableOpacity
          onPress={this.toggleShowButton.bind(this)}
          style={styles.showButton}
        >
          <Text style={{color: 'white'}}>{this.state.hidePassword ? "Show" : "Hide"}</Text>
        </TouchableOpacity>

        <TextInput
          fontSize={20}
          placeholder="Password"
          secureTextEntry={this.state.hidePassword}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholderTextColor="white"
            style={{color: 'white'}}
        />
        {this.renderButton()}
        <TouchableOpacity
          style={styles.button2}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: '400' }}> Create Account </Text>
        </TouchableOpacity>
        {/* <Text
          style={styles.textStyle}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          Create Account
        </Text> */}
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff",
    marginTop: 10
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
  showButton: {
    position: "absolute",
    right: 30,
  }
});
