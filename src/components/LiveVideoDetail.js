import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const liveComments = [
  { comment: "Hello", name: "Ovais Butt", photo: "./../../thum/thumb-6.jpg" },
  {
    comment: "How are you?",
    name: "Ovais Butt",
    photo: "./../../thum/thumb-6.jpg"
  },
  {
    comment: "Good to see you back!",
    name: "Ovais Butt",
    photo: "./../../thum/thumb-6.jpg"
  }
];

export default class LiveVideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data || "",
      //data: [],
      //id: "",
      commentPost: ""
      //pageRefreshing: false
      //commentsGot: this.props.navigation.state.params.commentsGot
    };
    // this.getToken();
  }

  toggleSendIcon() {
    if (!this.state.commentPost.length) {
      return (
        <Image
          source={require("../../thum/sendApp.png")}
          style={{ height: 30, width: 30 }}
        />
        // <Icon name="ios-heart" color="red" size={30} />
      );
    } else {
      return (
        <Image
          source={require("../../thum/sendGrey.png")}
          style={{ height: 30, width: 30 }}
        />
      );
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("./../../thum/thumb-6.jpg")}
          style={{ height: "100%", width: "100%" }}
        >
          <Icon
            name="ios-close-circle-outline"
            size={30}
            color="white"
            style={{ marginLeft: 20, marginTop: 20 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <View
            style={{
              width: "100%",
              //flexDirection: "row",
              position: "absolute",
              bottom: 60
              //backgroundColor: "white"
            }}
          >
            <FlatList
              data={liveComments}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 25,
                    height: 60,
                    width: "60%",
                    flexDirection: "column",
                    marginLeft: 20,
                    marginBottom: 10,
                    paddingLeft: 20,
                    paddingTop: 5,
                    paddingBottom: 5
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {item.comment}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              position: "absolute",
              bottom: 0
              //backgroundColor: "white"
            }}
          >
            <TextInput
              fontSize={18}
              placeholderTextColor="white"
              placeholder="Type a comment..."
              scrollEnabled={true}
              multiline={true}
              onChangeText={commentPost => this.setState({ commentPost })}
              value={this.state.commentPost}
              selectionColor="white"
              style={{
                fontSize: 16,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: "white",
                width: "80%",
                margin: 10,
                height: "60%",
                paddingLeft: 15,
                color: "white"
              }}
            />
            <TouchableOpacity
              onPress={() => {
                //this.onPostButtonPressed();
              }}
            >
              <View
                style={{
                  marginTop: 15,
                  marginLeft: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.toggleSendIcon()}
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
