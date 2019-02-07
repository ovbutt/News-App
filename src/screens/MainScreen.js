import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Today from "./Today";
import Cat from "./Cat";
import Discover from "./Discover";
import Search from "./Search";
import Pages from "./Pages";
import axios from 'axios'
import { ScrollView } from "react-native-gesture-handler";

export default class MainScreen extends Component {
  
  //   state = { news : [] }
  
  // componentWillMount(){
  //   axios.get('https://whispering-island-75602.herokuapp.com/api/posts')
  //   .then(response=>{console.log(response);this.setState({ news:response.data })})
  //   .then(()=>console.log('News State', this.state.news))
  //   .catch(function(error){
  //     console.log('error', error)
  //   })

  // };
  // renderPosts(){
  //   return this.state.news.map(posts =>
  //   <Today key={posts.title} posts={posts}/>)
  // }
  static navigationOptions = {
    header: null
  };
  render() {
    
    return (        
        <NV /> 
    )
  }
}
const AppTabNavigator = createBottomTabNavigator(
  {
    Today: {
      screen: Discover
    },
    Cat: {
      screen: Cat
    },
    Discover: {
      screen: Today
    },
    Search: {
      screen: Search
    },
    Pages: {
      screen: Pages
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: "white"
          }
        })
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true
    }
  }
);
const NV = createAppContainer(AppTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
