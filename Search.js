import React, {Component} from 'react';
import { SearchBar } from 'react-native-elements'
import {Platform, StyleSheet, TouchableOpacity,Text, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
export default class Search extends Component {
  state = {
    names: [
       {
          id: 0,
          name: 'Politics',
       },
       {
          id: 1,
          name: 'Sports',
       },
       {
          id: 2,
          name: 'Fashion',
       },
       {
          id: 3,
          name: 'Travel',
       },
       {
        id: 3,
        name: 'Animals',
     },
     {
      id: 3,
      name: 'Movies',
   }
    ]
 }
 alertItemName = (item) => {
    alert(item.name)
 }

    static  navigationOptions ={
        tabBarIcon:({tintColor}) =>(
       <Icon name="ios-search"   color= {tintColor} size={30}/>)
    }
  render() {
    return(
        <View>
<View>
<View>
<Text style={{fontWeight:'bold',fontSize:25,color:'black',marginLeft:10,marginTop:10}}> Search</Text>
</View>
<SearchBar
  showLoading
  platform="ios"
  cancelButtonTitle="Cancel"
  placeholder='Search' />
</View>
<View>
<Text style={{fontWeight:'bold',fontSize:30,color:'black',marginLeft:10,marginTop:20}}>Popular Categories</Text>
</View>
<View>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
</View>
);
}
}
const styles = StyleSheet.create ({
  container: {
     padding: 10,
     marginTop:10 ,
     backgroundColor: '#C0C0C0',
     alignItems: 'center',
  },
  text: {
     color: '#4f603c'
  }
})