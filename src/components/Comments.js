import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Swipeout from "react-native-swipeout";

const ACCESS_ID = "access_id";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propPostid: this.props.navigation.state.params.data || "",
      data: [],
      id: "",
      commentPost: "",
      pageRefreshing: false
      //commentsGot: this.props.navigation.state.params.commentsGot
    };
    this.getToken();
  }

  componentWillMount() {
    console.log("Idfromprops: ", this.state.propPostid);
    const { commentsGot, data } = this.state;
    axios
      .get("http://198.245.53.50:5000/api/postsById/" + this.state.propPostid)
      .then(response => {
        // console.log(
        //   "responce getting post",
        //   response.data.commentsGot[0].commentedBy[0].fullName
        // );
        this.setState({ propPostid: response.data._id, data: response.data });
        console.log("DataState:", this.state.data);
      })
      .catch(error => console.log("PostById Error:", error));
    // console.log("Data State:", data);
    // this.setState({ commentsGot : data.commentsGot });
    //console.log("Comments Got:", commentsGot);
  }

  static navigationOptions = {
    header: null
  };

  async getToken() {
    try {
      let id = await AsyncStorage.getItem(ACCESS_ID);
      this.setState({ id: id });
      console.log("Id is", id);
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
      .post("http://198.245.53.50:5000/api/add-comment", {
        userId: id,
        postId: postId,
        commentText: commentPost
      })
      .then(response => {
        console.log("Response Comment: ", response.data);
        this.setState({
          propPostid: response.data._id,
          data: response.data,
          commentPost: ""
        });
        //console.log("New Coment Array", this.state.commentsGot);
        this.scrollView.scrollToEnd({ animated: true });
      })
      .catch(error => {
        console.log("Error Comment: ", error);
      });
  }

  renderItem = ({ item }) => {
    var swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          Alert.alert(
            "Delete Comment?",
            "Are you sure you want to delete comment?",
            [
              {
                text: "No",
                style: "cancel"
              },
              {
                text: "Yes",
                onPress: () =>
                  axios
                    .post("http://198.245.53.50:5000/api/delComment", {
                      id: item._id,
                      postId: this.state.propPostid
                    })
                    .then(res => {
                      console.log("Delete comment res:", res);
                    })
                    .catch(err => {
                      console.log("Error in Delete comment", err);
                    })
              }
            ]
          );
        }
      }
    ];
    return (
      <Swipeout
        right={swipeoutBtns}
        style={{ backgroundColor: "#2a2d3b" }}
        disabled={this.state.id == item.commentedBy[0]._id ? false : true}
      >
        <View style={{ flexDirection: "row", width: "90%" }}>
          <Icon
            name="ios-contact"
            size={45}
            style={{ color: "#fff", marginTop: 10, marginRight: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            {/* <Text style={styles.catagoryStyle}>{item.comment}</Text> */}
            <Text
              style={{
                color: "#fff",
                marginTop: 8,
                fontSize: 18,
                fontWeight: "500"
              }}
            >
              {item.commentedBy[0].fullName}
            </Text>
            <Text style={styles.titleTextStyle}>{item.comment}</Text>
            {/* <View
              style={{
                flexDirection: "row",
                marginLeft: 100,
                marginBottom: 10
              }}
            >
              <Text>Comment by: </Text>
              <Text style={{ color: "#fff" }}>
                {item.commentedBy[0].fullName}
              </Text>
            </View> */}
          </View>
        </View>
      </Swipeout>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  _onRefresh = () => {
    this.setState({ pageRefreshing: true });
    console.log("Idfromprops: ", this.state.propPostid);
    const { data } = this.state;
    axios
      .get("http://198.245.53.50:5000/api/postsById/" + this.state.propPostid)
      .then(response => {
        console.log("propPostid", response.data._id, "data", response.data);
        this.setState({ propPostid: response.data._id, data: response.data });
      })
      .catch(error => console.log("PostById Error:", error));
    setTimeout(
      () =>
        this.setState({
          pageRefreshing: false
        }),
      1000
    );
  };

  toggleSendIcon() {
    if (!this.state.commentPost.length) {
      return (
        <Image
          source={require("../../thum/sendApp.png")}
          style={{ height: 30, width: 30 }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../thum/send.png")}
          style={{ height: 30, width: 30 }}
        />
      );
    }
  }
  render() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#2a2d3b" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Icon
            name="ios-arrow-round-back"
            color="#fff"
            size={40}
            style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 20
            }}
          >
            Comments
          </Text>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontSize: 14,
              color: "#fff"
            }}
          >
            Swipe left on comment to delete
          </Text>
          <View
            style={{
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
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
              //extraData={commentsGot}
              ref="commentsList"
            />
          </View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#262832"
          }}
        >
          <TextInput
            selectionColor="#fff"
            placeholderTextColor="#fff"
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
              paddingLeft: 15,
              backgroundColor: "rgba(255,255,255,0.3)",
              color: "#fff"
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.onPostButtonPressed();
            }}
            disabled={!this.state.commentPost ? true : false}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "100",
    fontSize: 16,
    color: "#fff",
    width: "60%",
    marginTop: 5,
    paddingBottom: 10
  }
});
