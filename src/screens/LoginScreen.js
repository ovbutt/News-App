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
import OfflineNotice from '../components/OfflineNotice'
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const ACCESS_TOKEN = "access_token";
const ACCESS_EMAIL = "access_email";
const ACCESS_NAME = "access_name";
const ACCESS_ID = "access_id";



export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      hidePassword: true,
      token: "",
      userEmail: '',
      userName: '',
      userId: '',
      isConnected: true
    };
  }

  componentWillMount(){
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

  toggleOfflineNotice(){
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }
    return null;
  }

  async storeToken(token, userEmail, userName, userId) {
    //const { token, userEmail, userName, userId } = this.state;
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
      await AsyncStorage.setItem(ACCESS_EMAIL, userEmail);
      await AsyncStorage.setItem(ACCESS_NAME, userName);
      await AsyncStorage.setItem(ACCESS_ID, userId);
      console.log("Token Saved", token, userId);
      //this.getToken();
    } catch (error) {
      console.log("Token cannot be saved");
    }
  }

  static navigationOptions = {
    header: null
  };
  onLoginButtonPress() {
    const { email, password } = this.state;
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ error: "", loading: true });

    if (!email.length) {
      alert("Email cannot be empty");
      this.setState({ loading: false });
    } else if (!emailCheckRegex.test(email)) {
      alert("Invalid Email, Please enter a valid Email (e.g example@gmail.com)");
      this.setState({ loading: false });
    } else if (!password.length) {
      alert("Password cannot be empty");
      this.setState({ loading: false });
    } else if (password.length < 6) {
      alert("Password must be atleast 6 characters");
      this.setState({ loading: false });
    } else {
      axios
        .post("http://198.245.53.50:5000/api/sign-in", {
          email: email,
          password: password
        })
        .then(response => {
          console.log(response);
          //this.setState({ token: response.data.token, userEmail: response.data.user.email, userName: response.data.user.fullName, userId: response.data.user._id });
          let token = response.data.token;
        let userEmail = response.data.user.email
        let userName = response.data.user.fullName
        let userId = response.data.user._id
        this.storeToken(token, userEmail, userName, userId )
        })
        //.then(this.storeToken.bind(this))
        .then(this.onLoginSuccess.bind(this))
        .then(() => {
          this.props.navigation.navigate("App");
        })
        .catch(this.onloginFailure.bind(this));
    }
  }

  onLoginSuccess() {
    this.setState({
      password: "",
      loading: false
    });
  }
  onloginFailure() {
    this.setState({ error: "Authentication Failed", loading: false });
    alert("Invalid Email or Password");
  }

  toggleShowButton() {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" style={{marginTop: 80}} />;
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onLoginButtonPress.bind(this)}
        >
          <Text style={{ color: "#003366", fontSize: 18, fontWeight: "700" }}>
            {" "}
            Log In{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../../thum/loginwallpaper.png")}
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
                marginTop: 150
              }}
            >
              Log In
            </Text>
            <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 25,
                height: "8%",
                width: "70%"
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
                style={{ color: "white", height: "100%", width: "75%" }}
                // selectionColor="white"
                // underlineColorAndroid="white"
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 25,
                height: "8%",
                width: "70%",
                marginTop: 20
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
                secureTextEntry={this.state.hidePassword}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholderTextColor="white"
                style={{ color: "white", height: "100%", width: "70%" }}
                // selectionColor="white"
                // underlineColorAndroid="white"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={this.toggleShowButton.bind(this)}
                style={styles.showButton}
              >
                <Icon
                  style={{ color: "white" }}
                  name={this.state.hidePassword ? "ios-eye" : "ios-eye-off"}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            {this.renderButton()}
            <TouchableOpacity
              style={styles.button2}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
                Create Account
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
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 40,
    width: 250,
    marginTop: 80
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    borderRadius: 25,
    marginTop: 10,
    height: 40,
    width: 250
  },
  showButton: {
    paddingTop: 8,
    paddingLeft: 10
  }
});
