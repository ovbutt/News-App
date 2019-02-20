import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput

} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Today extends Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
      headerTitle: "Go Live",
      headerRight: (
        <Icon
        name='tv'
          onPress={() => alert('Go Live Button')}
          size={30}
          style={{marginRight: 20, color: '#000'}}
        />
      ),
  };
  render() {
    return (
      <View style={styles.container}>
      <TextInput
        placeholder='Title'
      ></TextInput>
      <TextInput
      placeholder='Category'
      ></TextInput>
      <TextInput
        placeholder='Description'
      ></TextInput>
      <TextInput
        placeholder='Tags'
      ></TextInput>
      
        {/* <Text style={styles.todayText}>
          Go Live
        </Text>
        <Image source={ require('../../thum/thumb-6.jpg')} style={{height: 300 , width: 400}}
        >
        </Image> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todayText: {
    fontSize: 30,
    marginBottom: 10,
    fontFamily: "Baskerville",
    fontWeight: "bold",
    color: "black"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});
