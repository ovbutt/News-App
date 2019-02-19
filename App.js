import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Cat from "./src/screens/Cat";
import CategoriesView from "./src/components/CategoriesView";
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import Today from "./src/screens/Today";
import Discover from "./src/screens/Discover";
import Search from "./src/screens/Search";
import Pages from "./src/screens/Pages";
import BreakingPosts from './src/components/BreakingPost'
import OtherPosts from './src/components/OtherPosts'
import NewsDetail from './src/components//NewsDetail'
import Icon from "react-native-vector-icons/Ionicons";
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
      //header: null
    }
  });
  const CategoryNavigator = createStackNavigator(
    {
      Categories : Cat,
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
          //header: null
        }
      });
    
  const AppTabNavigator = createBottomTabNavigator(
    {
      Today: {
        screen: TodayNavigator,   
      },
      // Categories: {
      //   screen: CategoryNavigator
      // },
      GoLive: {
        screen: Today
      },
      Search: {
        screen: SearchNavigator
      },
      Profile: {
        screen: Pages,
      }
    },
    {
      animationEnabled: true,
      swipeEnabled: true,
      tabBarPosition: "bottom",
      tabBarOptions: {
        activeTintColor: "#003366",
        inactiveTintColor: "#d1cece",
        showLabel: true,
        showIcon: true
      },
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Today') {
            iconName = 'ios-star';
          } else if (routeName === 'Categories') {
            iconName = 'ios-apps'
          }
          else if (routeName === 'Search') {
            iconName = 'ios-search'
          }
          return <Icon name={iconName} size={25} color={tintColor} />;
        },
      }),
      
    }
  );
const AppStack = createStackNavigator({ First: AppTabNavigator },{
  defaultNavigationOptions:{
    header: null
  }
});
const AuthStack = createStackNavigator({ Login: LoginScreen, Signup : SignupScreen, Profile: Pages  });

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