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
import Icon from "react-native-vector-icons/Ionicons";

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
      return <ActivityIndicator size="large" />;
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
            <View style={{flexDirection: 'row' , borderColor: 'white', borderWidth: 1, borderRadius: 25, height: '8%', width: '70%'}} >
              <Icon name='ios-mail' size={25} style={{color: 'white', paddingLeft: 15, paddingTop: 8, paddingRight: 10}}/>
            <TextInput
              fontSize={20}
              placeholder="example@gmail.com"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholderTextColor="white"
              style={{ color: "white", height: '100%', width: '75%' }}
              selectionColor="white"
              underlineColorAndroid="white"
              autoCapitalize = "none"
            />
            </View>
            <View style={{flexDirection: 'row' , borderColor: 'white', borderWidth: 1, borderRadius: 25, height: '8%', width: '70%', marginTop: 20}} >
              <Icon name='ios-lock' size={25} style={{color: 'white', paddingLeft: 15, paddingTop: 8, paddingRight: 10}}/>
            <TextInput
              fontSize={20}
              placeholder="Password"
              secureTextEntry={this.state.hidePassword}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholderTextColor="white"
              style={{ color: "white", height: '100%', width: '70%' }}
              selectionColor="white"
              underlineColorAndroid="white"
              autoCapitalize = "none"
            />
            <TouchableOpacity
              onPress={this.toggleShowButton.bind(this)}
              style={styles.showButton}
            >
              <Icon style={{ color: "white" }} name={this.state.hidePassword ? "ios-eye" : "ios-eye-off"} size={25}/>
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
