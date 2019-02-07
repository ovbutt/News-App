import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CategoriesView from '../components/CategoriesView';

export default class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: "Business",
      world: "World",
      fashion: "Fashion",
      politics: "Politics",
      sports: "Sports",
      health: "Health",
      science: "Science"
    };

  }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-american-football" color={tintColor} size={30} />
    )
  };
  render() {
    //const {push} = this.props.navigation
    return (
      <View>
      
        <Text
          style={{
            fontSize: 15,
            marginTop: 50,
            marginLeft: 20,
            fontSize: 35,
            color: "black",
            fontWeight: "bold"
          }}
        >
          Categories
        </Text>

        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView')}}>
              <ImageBackground
                source={require("../../thum/sports.jpg")}
                imageStyle={{ borderRadius: 10 }}
                style={styles.ImageStyle}
              >
                <View
                  style={{
                    justifyContent: "center",
                    paddingTop: 60,
                    alignItems: "flex-start",
                    backgroundColor: "rgba()"
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: 10,
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      fontSize: 20,
                      color: "white"
                    }}
                  >
                    {this.state.business}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <ImageBackground
              source={require("../../thum/music.jpg")}
              imageStyle={{ borderRadius: 10 }}
              style={styles.ImageStyle2}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 60,
                  fontSize: 20,
                  backgroundColor: "rgba()"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {this.state.world}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flexDirection: "row", marginTop: 0 }}>
            <ImageBackground
              source={require("../../thum/photography.jpg")}
              imageStyle={{ borderRadius: 10 }}
              style={styles.ImageStyle}
            >
              <View
                style={{
                  justifyContent: "center",
                  paddingTop: 60,
                  fontSize: 20,
                  alignItems: "flex-start",
                  backgroundColor: "rgba()"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {this.state.fashion}
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("../../thum/travel.jpg")}
              imageStyle={{ borderRadius: 10 }}
              style={styles.ImageStyle2}
            >
              <View
                style={{
                  justifyContent: "center",
                  paddingTop: 60,
                  fontSize: 20,
                  alignItems: "flex-start",
                  backgroundColor: "rgba()"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {this.state.politics}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <ImageBackground
              source={require("../../thum/sports.jpg")}
              imageStyle={{ borderRadius: 10 }}
              style={styles.ImageStyle}
            >
              <View
                style={{
                  justifyContent: "center",
                  paddingTop: 60,
                  fontSize: 20,
                  alignItems: "flex-start",
                  backgroundColor: "rgba()"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {this.state.sports}
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("../../thum/food.jpg")}
              imageStyle={{ borderRadius: 10 }}
              style={styles.ImageStyle2}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 60,
                  fontSize: 20,
                  backgroundColor: "rgba()"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {this.state.health}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../../thum/food.jpg")}
              imageStyle={{ borderRadius: 10 }}
              style={styles.ImageStyle}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 60,
                  fontSize: 20,
                  backgroundColor: "rgba()"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white"
                  }}
                >
                  {this.state.science}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  ImageStyle: {
    width: 170,
    height: 100,
    marginBottom: 15,
  },
  ImageStyle2: {
    width: 170,
    height: 100,
    marginBottom: 15,
    marginLeft: 20
  },
  container: {
    alignItems: "center",
    justifyContent: "space-around"
  }
});
