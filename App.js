import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Cat from "./src/screens/Cat";
import CategoriesView from "./src/components/CategoriesView";
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import Today from "./src/screens/Today";
import Discover from "./src/screens/Discover";
import Search from "./src/screens/Search";
import Pages from "./src/screens/Pages";
import NewsDetail from './src/components//NewsDetail'

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const TodayNavigator = createStackNavigator(
  {
   Today : Discover,
   NewsDetail : NewsDetail

  },{
    defaultNavigationOptions:{
      header: null
    }
  });
  const CategoryNavigator = createStackNavigator(
    {
     Cat : Cat,
     CategoriesView : CategoriesView,
     NewsDetail : NewsDetail
  
    },{
      defaultNavigationOptions:{
        header: null
      }
    });
    const SearchNavigator = createStackNavigator(
      {
       Search : Search,
       CategoriesView : CategoriesView,
       NewsDetail : NewsDetail
    
      },{
        defaultNavigationOptions:{
          header: null
        }
      });
    
  const AppTabNavigator = createBottomTabNavigator(
    {
      Today: {
        screen: Discover,
         
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
        showLabel: true,
        showIcon: true
      }
    }
  );
const AppStack = createStackNavigator({ First: AppTabNavigator },{
  defaultNavigationOptions:{
    header: null
  }
});
const AuthStack = createStackNavigator({ Login: LoginScreen, Signup : SignupScreen, Pages: Pages  });

const AuthSwitchNavigator = createSwitchNavigator ({
  AuthLoadingScreen: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
},
{
  initialRouteName: 'AuthLoadingScreen',
}
)

const AppContainer = createAppContainer(AuthSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});