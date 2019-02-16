import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const ACCESS_TOKEN = "access_token";
export default class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", fullName: "", email: "" };
  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-contact" color={tintColor} size={30} />
    )
  };

  async getToken() {
    const { fullName, email } = this.state;
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.setState({ token: token });
      axios
        .post("http://198.245.53.50:5000/api/users/profile", {
          token: token
        })
        .then(response => {
          console.log(response);
          this.setState({
            fullName: response.data.fullName,
            email: response.data.email
          });
        })
        .catch(error => {
          console.log(error);
        });
      console.log("Token is", token);
      //this.removeToken();
    } catch (error) {
      console.log("Cannot get token");
    }
  }
  componentWillMount() {
    this.getToken();
  }
  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      console.log("Token removed");
      {this.props.navigation.navigate('Login')}
      //this.getToken();
    } catch (error) {
      console.log("Cannot remove token");
    }
  }

  render() {
    const { fullName, email } = this.state;
    const { push } = this.props.navigation;
    console.log(fullName, email);
    return (
      <ImageBackground
        source={require('../../thum/profileWallpaper.jpg')}
        style={{height: '100%', width: '100%'}}
      >
      <View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: "normal",
              color: "white",
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 20
            }}
          >
            Profile
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}
          >
            <Icon name="ios-contact" color='white' size={150} />
          </View>
          
          <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <Text style={styles.nameEmailText}>Name: </Text>
              <Text style={styles.nameEmailText}>{fullName}</Text>
            </View>
            
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <Text style={styles.nameEmailText}>Email: </Text>
              <Text style={styles.nameEmailText}>{email}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                
                onPress={() => {
                  this.removeToken();
                }}
                style={styles.button2}
              >
              <Text style={{color: 'white', fontSize: 18, fontWeight:'500'}}>Log Out</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#C0C0C0",
    alignItems: "center"
  },
  text: {
    color: "#4f603c"
  },
  nameEmailText: {
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: "Arial",
    fontWeight: "700",
    color: "white"
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
});
