import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator, createAppContainer, SwitchNavigator} from "react-navigation";
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/SignupScreen';


export const createRootNavigator = (authenticated = false) => {
    return SwitchNavigator({
        MainScreen: {
            screen: MainScreen,
        },
        LoginScreen: {
            screen: LoginScreen,
        }
    },{
        initialRouteName: authenticated ? 'MainScreen' : 'LoginScreen'
    })
}
