import React, {Component} from 'react';
import { List } from 'react-native-paper';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { Container,CardItem, Content,Button, Card, Thumbnail } from 'native-base';
export default class Pages extends Component {
    static  navigationOptions ={
        tabBarIcon:({tintColor}) =>(
       <Icon name="ios-archive"   color= {tintColor} size={30}/>)
    }
  render() {
    return(
      <View>
<View style={{marginTop:20,marginLeft:20}}>
<Thumbnail style={{marginBottom:5}} source={require('../../thum/set.jpg')}  Settings/>
<Text style={{fontSize:30,fontStyle:'normal',color:'black',fontWeight:'bold'}}>Settings</Text>
</View>
<List.Section style={{color:'black'}} title="@Sofftar-Developers">
      <List.Item
        title="Today-Information"
        left={() => <List.Icon icon="account-balance" />}
     />
      <List.Item
        title="Categories"
        left={() => <List.Icon icon="add-shopping-cart" />}
     />
    <List.Item
        title="Discover"
        left={() => <List.Icon icon="attach-money" />}
     />
      <List.Item
        title="Search"
        left={() => <List.Icon icon="arrow-upward" />}
     />
     <List.Item
        title="Settings"
        left={() => <List.Icon icon="access-alarm" />}
     />
   </List.Section>
      </View>
    
);
}
}