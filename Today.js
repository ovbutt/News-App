import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,ShareContent,Image ,ScrollView,ImageBackground, TouchableHighlight,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { Container,CardItem, Content,Button, Card, Thumbnail } from 'native-base';
export default class Today extends Component {
    static  navigationOptions ={
        tabBarIcon:({tintColor}) =>(
       <Icon name="ios-today"   color= {tintColor} size={30}/>)
    }
  render() {
    return(
        
    <View>
        <ScrollView>
        <Text style={{fontSize:15,marginLeft:10,color:'black',marginTop:5}}> FRIDAY 04 2019 </Text>
        <Text style={{fontSize:25,marginLeft:10,marginTop:10,fontFamily:'bold',color:'black'}}> TODAY </Text>
        <TouchableOpacity onPress={this._onPressButton}>
        <ImageBackground  source={require('./thum/1.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332,marginBottom:50,marginLeft:15,paddingLeft:5,paddingBottom:5}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,fontWeight:'bold'}]}>Soprano Announces His New Album</Text>
        </View>
        <View style={{flexDirection:'row', marginBottom:10}}>
        <Thumbnail style={{marginBottom:5}} source={require('./thum/2.jpg')} />
        <Text style={{fontSize:30,color:'white',marginLeft:5,fontStyle:'normal',fontWeight:'bold'}}>Waseem</Text>
        <Icon name="ios-chatbubbles" style={{marginLeft:80}} size={30}>22</Icon>
         </View>
        </ImageBackground>
        </TouchableOpacity>
<View >
        <TouchableOpacity onPress={this._onPressButton}>
        <ImageBackground  source={require('./thum/2.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:250,width:332,marginLeft:15,paddingLeft:5,paddingBottom:5}}>      
        </ImageBackground>
        <View style={{marginLeft:30}}>
        <Text style={{fontWeight:'bold'}}>Gaming</Text>
        <Text style={{fontWeight:'bold',fontSize:30,color:'black'}}> The Future of Gaming</Text>
        <Text style={{marginBottom:25}} >Mozilla has anncouced a new version of its browser for augmented reality</Text>
        </View>
        </TouchableOpacity>
<View>
        <TouchableOpacity onPress={this._onPressButton}>
        <ImageBackground  source={require('./thum/3.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332,marginBottom:50,marginLeft:15,paddingLeft:5,paddingBottom:5}}>
       <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,fontWeight:'bold'}]}>Nicki Minaj in Featuring with Drake! </Text>
        </View>
        <View style={{flexDirection:'row', marginBottom:10}}>
        <Thumbnail style={{marginBottom:5}} source={require('./thum/2.jpg')} />
        <Text style={{fontSize:30,fontStyle:'normal',fontWeight:'bold'}}>Jess Roxana</Text>
        <Icon name="ios-chatbubbles" style={{marginLeft:30}} size={30}>22</Icon>
         </View>
        </ImageBackground>
        </TouchableOpacity>
        </View>
</View>
<View style={{marginTop:30}}>
<Text style={{fontSize:15,marginTop:5}}> 14 MARCH </Text>
        <Text style={{fontSize:25,marginTop:10,fontFamily:'bold',color:'black'}}> MONDAY </Text>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flexDirection:'column' , marginTop:10}}>
<ImageBackground  source={require('./thum/thumb-4.jpg')}  imageStyle={{ borderRadius: 10 }} style={{height:250,width:150 ,marginTop:10 , marginLeft:10,marginBottom:2,marginRight:10}}>
        <View style={{justifyContent:'center',paddingTop:200,fontSize:20,alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Nadal Wins</Text>
        </View>
        </ImageBackground>
<ImageBackground  source={require('./thum/thumb-5.jpg')} imageStyle={{ borderRadius: 10 }} style={{height:250,width:150 ,marginTop:10,marginTop:10 , marginLeft:10,marginBottom:10,marginRight:10}}>
<View style={{justifyContent:'center',alignItems:'center',paddingTop:200,fontSize:20,backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Top Sunglasses</Text>
        </View>
</ImageBackground>
<ImageBackground  source={require('./thum/thumb-6.jpg')} imageStyle={{ borderRadius: 10 }} style={{height:250,width:150 ,marginTop:10,marginTop:10 , marginLeft:10,marginBottom:10,marginRight:10}}>
<View style={{justifyContent:'center',alignItems:'center',paddingTop:200,fontSize:20,backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Moto-Cross</Text>
        </View>
</ImageBackground>
</View>
<View style={{flexDirection:'column' , marginTop:0}}>
<ImageBackground  source={require('./thum/thumb-7.jpg')}  imageStyle={{ borderRadius: 10 }} style={{height:200,width:150 ,marginTop:0 ,marginTop:10 , marginLeft:10,marginBottom:10,marginRight:10}}>
<View style={{justifyContent:'center',paddingTop:150,fontSize:20,alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Nadal Wins</Text>
        </View>
</ImageBackground>
<ImageBackground  source={require('./thum/thumb-8.jpg')} imageStyle={{ borderRadius: 10 }} style={{height:200,width:150 ,marginTop:10,marginTop:10 , marginLeft:10,marginBottom:10,marginRight:10}}>
<View style={{justifyContent:'center',paddingTop:150,fontSize:20,alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Nadal Wins</Text>
        </View>
</ImageBackground>
<ImageBackground  source={require('./thum/thumb-9.jpg')} imageStyle={{ borderRadius: 10 }} style={{height:200,width:150 ,marginTop:10,marginTop:10 , marginLeft:10,marginBottom:10,marginRight:10}}>
<View style={{justifyContent:'center',paddingTop:150,fontSize:20,alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={{backgroundColor:'transparent',fontFamily:'Arial',fontWeight:'bold',color:'white'}}>Nadal Wins</Text>
        </View>
</ImageBackground>
</View>

</View>
        </ScrollView>
        </View>
        
);
}
}
const styles = StyleSheet.create({
textStyle:{
    fontSize:30,
    fontFamily:'bold',
    color:'white',
    fontStyle:'italic',
    fontFamily:'Baskerville'
}
  });