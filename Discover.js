import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Image,ImageBackground,ScrollView,TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
export default class Discover extends Component {
    static  navigationOptions ={
        tabBarIcon:({tintColor}) =>(
       <Icon name='ios-star'  color= {tintColor} size={30}/>)
    }
  render() {
    return (
        <ImageBackground source={require('./thum/back.jpg')} style={styles.backgroundImage}>
                {this.props.children}
                <View>
                    <Text style={{marginTop:30,marginLeft:20,marginBottom:20,color:'black'}}>
                        THIS WEEK
                    </Text>
                    <Text style={{fontWeight:'bold',marginLeft:20,fontSize:30,color:'black'}}>
                        Discover
                    </Text>
                    <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
                    <View style={{flexDirection:'row'}}>
        <ImageBackground  source={require('./thum/thumb-5.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332,marginLeft:10,marginRight:10}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,color:'white',fontSize:30,fontWeight:'bold'}]}>NASA Chooses Its Next Cheif Scientist</Text>
        </View>
        </ImageBackground>

        <ImageBackground  source={require('./thum/thumb-19.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332 ,marginLeft:10,marginRight:10}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,fontSize:30,color:'white',fontWeight:'bold',fontWeight:'bold'}]}>Jeffery Campbell's New SHoes</Text>
        </View>
        </ImageBackground>

        <ImageBackground  source={require('./thum/thumb-6.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332,marginLeft:10,marginRight:10}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,color:'white',fontSize:30,fontWeight:'bold'}]}>The Best Models Of Sunglasses To Go Out</Text>
        </View>
        </ImageBackground>

        <ImageBackground  source={require('./thum/1.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332,marginLeft:10,marginRight:10}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,color:'white',fontSize:30,fontWeight:'bold'}]}>Soprano Announces His New Album</Text>
        </View>
        </ImageBackground>

        <ImageBackground  source={require('./thum/thumb-17.jpg')} imageStyle={{ borderRadius: 25 }} style={{height:405,width:332,marginLeft:10,marginRight:10}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba()'}}>
        <Text style={[styles.textStyle,{backgroundColor:'transparent',fontFamily:'Arial',paddingTop:250,marginBottom:20,color:'white',fontSize:30,fontWeight:'bold'}]}>Will Conor Return to the UFC Octagon?</Text>
        </View>
        </ImageBackground>

</View>
</ScrollView>
                </View>
        </ImageBackground>
    )

}
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});