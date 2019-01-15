import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ScrollView, View, ImageBackground ,TouchableHighlight} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
export default class Cat extends Component {
    static  navigationOptions ={
        tabBarIcon:({tintColor}) =>(
       <Icon name='ios-american-football' color= {tintColor} size={30}/>)
    }
  render() {
    return(
        <View>
            <ScrollView>
    <View>
<Text style={{fontSize:15,marginTop:15,marginLeft:10,marginBottom:30,fontSize:35,color:'black',fontWeight:'bold'}}> Categories </Text>
</View>
<View style={{flexDirection:'row' , marginTop:10}}>
<TouchableHighlight>
<ImageBackground  source={require('./thum/sports.jpg')}  imageStyle={{ borderRadius: 10 }} style={styles.ImageStyle}>
        <View style={{justifyContent:'center',paddingTop:60,fontSize:20,alignItems:'flex-start',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',marginLeft:10,fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Sports</Text>
        </View>
        </ImageBackground>
</TouchableHighlight>
<ImageBackground  source={require('./thum/music.jpg')} imageStyle={{ borderRadius: 10 }} style={styles.ImageStyle}>
<View style={{justifyContent:'center',alignItems:'flex-start',paddingTop:60,fontSize:20,backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',marginLeft:10,fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Music</Text>
        </View>
</ImageBackground>
</View>
<View style={{flexDirection:'row' , marginTop:0}}>
<ImageBackground  source={require('./thum/photography.jpg')}  imageStyle={{ borderRadius: 10 }} style={styles.ImageStyle}>
<View style={{justifyContent:'center',paddingTop:60,fontSize:20,alignItems:'flex-start',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',marginLeft:10,fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Photography</Text>
        </View>
</ImageBackground>
<ImageBackground  source={require('./thum/travel.jpg')} imageStyle={{ borderRadius: 10 }} style={styles.ImageStyle} >
<View style={{justifyContent:'center',paddingTop:60,fontSize:20,alignItems:'flex-start',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',marginLeft:10,fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Travel</Text>
        </View>
</ImageBackground>
</View>
<View style={{flexDirection:'row' , marginTop:10}}>
<ImageBackground  source={require('./thum/gaming.jpg')}  imageStyle={{ borderRadius: 10 }} style={styles.ImageStyle}>
        <View style={{justifyContent:'center',paddingTop:60,fontSize:20,alignItems:'flex-start',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',marginLeft:10,fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Gaming</Text>
        </View>
        </ImageBackground>
<ImageBackground  source={require('./thum/food.jpg')} imageStyle={{ borderRadius: 10 }} style={styles.ImageStyle}>
<View style={{justifyContent:'center',alignItems:'flex-start',paddingTop:60,fontSize:20,backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',marginLeft:10,fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Food</Text>
</View>
</ImageBackground>
</View> 
</ScrollView>   
</View>
);
}
}


const styles = StyleSheet.create({
    ImageStyle:{
      width:150,
      height:100,
      marginLeft:20,
      marginBottom:15
    }
      });