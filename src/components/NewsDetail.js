import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  WebView,
  Button
} from "react-native";
import HTMLView from "react-native-htmlview";

export default class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.navigation.state.params.data };
  }
  static navigationOptions = {
    headerTitle: "News"
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

        
          <View style={{ padding: 15 }}>
            <HTMLView value={data.description} stylesheet={styles} />
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
