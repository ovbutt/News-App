import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  WebView
} from "react-native";

export default class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.navigation.state.params.data };
  }
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
              padding: 8
            }}
          >
            {data.title}
          </Text>
          <Image
            source={{ uri: data.photoUrl }}
            style={{
              height: 250,
              width: "100%",
              marginBottom: 8,
              marginTop: 8
            }}
          />
         
        <WebView
        style={styles.webContainer}
            //automaticallyAdjustContentInsets={false}
            //ref={'webview'}
            // javaScriptEnabled={true}
            // domStorageEnabled={true}
            source={{ html: data.description }}
          />
      
    
          {/* <Text style={{ fontSize: 16, justifyContent: "space-around" }}>
            
            {data.description}
          </Text> */}
          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: 'grey' }}>
            <Text style={{color: 'black'}}>Date: </Text>
            <Text>{data.updatedAt.substring(0,10)}</Text>
            <Text style={{ color: 'black', marginLeft: 10 }}>Tags: </Text>
            <Text>{data.tags}</Text>
          </View>
        </ScrollView>
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
    height: 180,
    width: '100%',
  }
});
