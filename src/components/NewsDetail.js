import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  FlatList
} from "react-native";
import HTMLView from "react-native-htmlview";
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left, Right } from "native-base";
import axios from "axios";

const ACCESS_ID = "access_id";
export default class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      id: "",
      commentPost: ""
    };
    this.getToken();
  }
  componentWillUnmount() {
    console.log("Component Will Unmount Called");
  }
  static navigationOptions = {
    header: null
  };

  async getToken() {
    try {
      let id = await AsyncStorage.getItem(ACCESS_ID);
      // let fullName = await AsyncStorage.getItem(ACCESS_NAME);
      // let email = await AsyncStorage.getItem(ACCESS_EMAIL);
      this.setState({ id: id });

      console.log("Id is", id);
      //this.removeToken();
    } catch (error) {
      console.log("Cannot get token");
    }
  }
  onPostButtonPressed() {
    const { commentPost, id, data } = this.state;
    let postId = data._id;

    console.log("onPostButtonCalled");
    console.log(
      "Data of comments:",
      "comment",
      commentPost,
      "userID",
      id,
      "PostID",
      postId
    );

    axios
      .post("http://198.245.53.50:5000/api/posts/add-comment", {
        userId: id,
        postId: postId,
        comment: commentPost
      })
      .then(response => {
        console.log("Response Comment: ", response);
        this.setState({commentPost: ""})
      })
      .catch(error => {
        console.log("Error Comment: ", error);
      });
  }
  renderItem = ({ item }) => {
    //item = item.filter(item=>item.breaking === false)
    return (
      <TouchableOpacity
        // onPress={() => {
        //   this.props.navigation.navigate("NewsDetail", { data: item });
        // }}
        onLongPress={() => alert("Long Pressed")}
      >
        <View style={{ flexDirection: "row", width: 380 }}>
          {/* <Image
            imageStyle={{ borderRadius: 10 }}
            source={{ uri: item.photoUrl }}
            style={styles.imageThumbStyle}
          /> */}
          <Icon
            name="ios-contact"
            size={35}
            style={{ color: "grey", marginTop: 10, marginRight: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            {/* <Text style={styles.catagoryStyle}>{item.comment}</Text> */}

            <Text style={styles.titleTextStyle}>{item.comment}</Text>
            <Text style={{ color: "grey", marginLeft: 200, marginBottom: 10 }}>
              {item.createdAt.substring(0, 10)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
          //marginLeft: "23%"
        }}
      />
    );
  };
  render() {
    const { data } = this.state;
    let commentsGot = data.commentsGot;
    return (
      <View>
        <ScrollView>
          <Header style={{ backgroundColor: "white" }}>
            <Left>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon
                    name="ios-arrow-back"
                    size={30}
                    style={{ color: "#000", marginLeft: 10, marginRight: 10 }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 30,
                    marginTop: 2
                  }}
                >
                  News
                </Text>
              </View>
            </Left>
            <Right/>
          </Header>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              margin: 10
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
              alignItems: "center"
            }}
          >
            <Text style={{ color: "black" }}>Category: </Text>
            <Text>{data.catagory}</Text>
          </View>

          <View
            style={{
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }}
          >
            <HTMLView value={data.description} stylesheet={styles} />
          </View>

          <Text
            style={{
              color: "black",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 20
            }}
          >
            Comments
          </Text>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              paddingLeft: "5%",
              paddingRight: "5%",
              marginBottom: 80
            }}
          >
            <FlatList
              data={data.commentsGot}
              keyExtractor={item => item._id}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </ScrollView>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            backgroundColor: "white"
          }}
        >
          <TextInput
            placeholder="Type a comment..."
            scrollEnabled={true}
            multiline={true}
            onChangeText={commentPost => this.setState({ commentPost })}
            value={this.state.commentPost}
            style={{
              fontSize: 16,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: "grey",
              width: "80%",
              margin: 10,
              height: "60%",
              paddingLeft: 15
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.onPostButtonPressed();
            }}
          >
            <Icon
              name="ios-send"
              size={40}
              color="#003366"
              style={{ marginTop: 15 }}
            />
          </TouchableOpacity>
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
  },
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "100",
    fontSize: 16,
    color: "black",
    paddingTop: 10,
    paddingBottom: 10
  }
});
