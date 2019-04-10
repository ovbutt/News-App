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
  ScrollView,
  NetInfo
} from "react-native";
import OfflineNotice from "../components/OfflineNotice";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const ACCESS_TOKEN = "access_token";
const ACCESS_EMAIL = "access_email";
const ACCESS_NAME = "access_name";
const ACCESS_ID = "access_id";

export default class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      token: "",
      userEmail: "",
      userName: "",
      userId: "",
      isConnected: true
    };
    //this.getTokenFromLoginRequest = this.getTokenFromLoginRequest.bind(this)
  }

  componentWillMount() {
    this.checkConnectionStatus();
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  checkConnectionStatus() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  toggleOfflineNotice() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }
    return null;
  }

  async storeToken(token, userEmail, userName, userId) {
    //const { token, userName, userEmail } = this.state;
    //console.log('states', token, userName, userEmail)
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
      await AsyncStorage.setItem(ACCESS_NAME, userName);
      await AsyncStorage.setItem(ACCESS_EMAIL, userEmail);
      await AsyncStorage.setItem(ACCESS_ID, userId);
      console.log("Token Saved", token, userId);
    } catch (error) {
      console.log("Token cannot be saved");
    }
  }

  getTokenFromLoginRequest = () => {
    const { email, password } = this.state;

    axios
      .post("http://198.245.53.50:5000/api/sign-in", {
        email: email,
        password: password
      })
      .then(response => {
        console.log("Login Responce: ", response);
        console.log(
          "token",
          response.data.token,
          "userName",
          response.data.user.fullName,
          "userEmail",
          response.data.user.email
        );
        //this.setState({ token: response.data.token, userEmail: response.data.user.email, userName: response.data.user.fullName  });
        let token = response.data.token;
        let userEmail = response.data.user.email;
        let userName = response.data.user.fullName;
        let userId = response.data.user._id;
        console.log("states", token, userName, userEmail, userId);
        this.storeToken(token, userEmail, userName, userId);
      })
      .catch(error => {
        console.log("Error from login Request: ", error);
      });
    //.then(this.storeToken(token, userEmail, ));
  };

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

    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ loading: true });
    if (!fullName.length) {
      alert("Please enter your full name");
      this.setState({ loading: false });
    } else if (!email.length) {
      alert("Email cannot be empty");
      this.setState({ loading: false });
    } else if (!emailCheckRegex.test(email)) {
      alert(
        "Invalid Email, Please enter a valid Email (e.g example@gmail.com)"
      );
      this.setState({ loading: false });
    } else if (!password.length) {
      alert("Password cannot be empty");
      this.setState({ loading: false });
    } else if (password.length < 6) {
      alert("Password must be atleast 6 characters");
      this.setState({ loading: false });
    } else if (password != password_confirmation) {
      alert("Password does not match");
      this.setState({ loading: false });
    } else {
      axios
        .post("http://198.245.53.50:5000/api/users", {
          fullName: fullName,
          email: email,
          password: password,
          role: "5c75c04c92746a1b1884a49e"
        })
        .then(response => {
          console.log("Signup responce:", response);
          this.getTokenFromLoginRequest();
          this.onSignupSuccess.bind(this);
          {
            this.props.navigation.popToTop();
          }
        })
        // .then()
        // .then()
        // .then()
        .catch(
          //error =>{console.log('Signup Error:', error);
          this.onSignupFailure.bind(this)
        );
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
      return (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 50 }}
          color="#f54b64"
        />
      );
    }
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.onSignupButtonPress.bind(this)}
      >
        <Text style={{ color: "#f54b64", fontSize: 18, fontWeight: "700" }}>
          SIGN UP
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <ImageBackground
        source={require("../../thum/forgotPasswordBG.png")}
        style={{ height: "100%", width: "100%" }}
      >
        {this.toggleOfflineNotice()}
        <ScrollView>
          <View style={styles.container}>
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "700",
                marginBottom: 50,
                marginTop: 120
              }}
            >
              Sign Up
            </Text>
            <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 25,
                height: 45,
                width: "90%"
              }}
            >
              <Icon
                name="ios-contact"
                size={25}
                style={{
                  color: "white",
                  paddingLeft: 15,
                  paddingTop: 8,
                  paddingRight: 10
                }}
              />
              <TextInput
                fontSize={18}
                placeholder="Full Name"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={fullName => this.setState({ fullName })}
                value={this.state.fullName}
                placeholderTextColor="white"
                style={{ color: "white", height: "100%", width: "80%" }}
                selectionColor="#fff"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 25,
                height: 45,
                width: "90%",
                marginTop: 10
              }}
            >
              <Icon
                name="ios-mail"
                size={25}
                style={{
                  color: "white",
                  paddingLeft: 15,
                  paddingTop: 8,
                  paddingRight: 10
                }}
              />
              <TextInput
                fontSize={18}
                placeholder="example@gmail.com"
                autoCorrect={false}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholderTextColor="white"
                style={{ color: "white", height: "100%", width: "80%" }}
                // selectionColor="white"
                // underlineColorAndroid="white"
                autoCapitalize="none"
                keyboardType="email-address"
                selectionColor="#fff"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 25,
                height: 45,
                width: "90%",
                marginTop: 10
              }}
            >
              <Icon
                name="ios-lock"
                size={25}
                style={{
                  color: "white",
                  paddingLeft: 15,
                  paddingTop: 8,
                  paddingRight: 10
                }}
              />
              <TextInput
                fontSize={18}
                placeholder="Password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholderTextColor="white"
                style={{ color: "white", height: "100%", width: "80%" }}
                // selectionColor="white"
                // underlineColorAndroid="white"
                autoCapitalize="none"
                selectionColor="#fff"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 25,
                height: 45,
                width: "90%",
                marginTop: 10
              }}
            >
              <Icon
                name="ios-lock"
                size={25}
                style={{
                  color: "white",
                  paddingLeft: 15,
                  paddingTop: 8,
                  paddingRight: 10
                }}
              />
              <TextInput
                fontSize={18}
                placeholder="Confirm Password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={password_confirmation =>
                  this.setState({ password_confirmation })
                }
                value={this.state.password_confirmation}
                placeholderTextColor="white"
                style={{ color: "white", height: "100%", width: "80%" }}
                // selectionColor="white"
                // underlineColorAndroid="white"
                autoCapitalize="none"
                selectionColor="#fff"
              />
            </View>

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
              <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
                {" "}
                Log In{" "}
              </Text>
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
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 45,
    width: "90%",
    marginTop: 50
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f54b64",
    borderRadius: 25,
    marginTop: 10,
    height: 45,
    width: "90%"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});
