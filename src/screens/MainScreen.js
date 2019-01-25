import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator ,createAppContainer} from 'react-navigation'
import Today from './Today';
import Cat from './Cat';
import Discover from './Discover';
import Search from './Search';
import Pages from './Pages';
export default class MainScreen extends Component {
    static  navigationOptions ={
       header: null
    }
  render(){
    return <NV />;
  }
}
  const AppTabNavigator = createBottomTabNavigator({
    Today:{
        screen:Today},
    Cat:{
        screen:Cat
    },
   Discover:{
        screen: Discover
    },
    Search:{
        screen: Search
    },
    Pages:{
        screen: Pages
    }
  },{
      animationEnabled:true,
      swipeEnabled:true,
      tabBarPosition:"bottom",
      tabBarOptions:{
          style:{
              ...Platform.select({
android:{ 
                backgroundColor:'white' }
              })
          },
activeTintColor:'#000',
inactiveTintColor:'#d1cece',
showLabel:false,
showIcon:true,
      }
});
  const NV= createAppContainer(AppTabNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
