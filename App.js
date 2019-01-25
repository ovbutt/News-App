import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator , createAppContainer} from 'react-navigation';
import MainScreen from './src/screens/MainScreen';


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const AppStackNavigator = createStackNavigator({
  First: MainScreen,
  });
  
  const AppContainer= createAppContainer(AppStackNavigator);
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

