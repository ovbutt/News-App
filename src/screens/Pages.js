import React, { Component } from "react";
import { List } from "react-native-paper";
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage
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
      <View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: "normal",
              color: "black",
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
            <Icon name="ios-contact" size={150} />
          </View>
          <View style={{ flexDirection: "column" }}>
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
              <Button
                title="Log Out"
                onPress={() => {
                  this.removeToken();
                }}
              />
            </View>
          </View>
        </View>
      </View>
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
    color: "black"
  }
});
