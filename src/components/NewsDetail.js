import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  WebView,
  Button,
  TextInput,
} from "react-native";
import HTMLView from "react-native-htmlview";
import Icon from "react-native-vector-icons/Ionicons";


export default class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.navigation.state.params.data };
  }
  componentWillUnmount(){
    console.log('Component Will Unmount Called')
  }
  static navigationOptions = {
    headerTitle: "News Details"
  };
  
  

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              margin: 10,
            }}
          >
            {data.title}
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderColor: "grey"
            }}
          >
            <Text style={{ color: "black" }}>Date: </Text>
            <Text>{data.updatedAt.substring(0, 10)}</Text>
            <Text style={{ color: "black", marginLeft: 10 }}>Tags: </Text>
            <Text>{data.tags}</Text>
          </View>
          <Image
            source={{ uri: data.photoUrl }}
            style={{
              height: 250,
              width: "100%",
              marginBottom: 8,
              marginTop: 8
            }}
          />
<View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black" }}>Category: </Text>
            <Text>{data.catagory}</Text>
          </View>
        
          <View style={{ padding: 15, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <HTMLView value={data.description} stylesheet={styles} />
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder='Type a comment...'
            scrollEnabled={true}
            style={{fontSize: 16 ,borderRadius: 25, borderWidth: 1, borderColor: 'grey', width: '80%', margin: 10, height: '65%', paddingLeft: 15}}
          ></TextInput>
          <Icon name='ios-send' size={40} color='#003366' style={{marginTop: 15 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  webContainer: {
    height: 100,
    width: "100%"
  },
  p: {
    fontWeight: "300",
    fontSize: 16,
    textAlign: "justify",
    color: "#000"
  }
});
