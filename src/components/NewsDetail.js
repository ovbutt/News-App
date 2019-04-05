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
  FlatList,
  RefreshControl,
  Alert,
  ImageBackground
} from "react-native";
import HTMLView from "react-native-htmlview";
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left, Right } from "native-base";
import axios from "axios";
import Swipeout from "react-native-swipeout";
import LinearGradient from "react-native-linear-gradient";

const ACCESS_ID = "access_id";

export default class NewsDetail extends Component {
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
        style={{ backgroundColor: "white" }}
        disabled={this.state.id == item.commentedBy[0]._id ? false : true}
      >
        <View style={{ flexDirection: "row", width: 370 }}>
          <Icon
            name="ios-contact"
            size={35}
            style={{ color: "grey", marginTop: 10, marginRight: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            {/* <Text style={styles.catagoryStyle}>{item.comment}</Text> */}

            <Text style={styles.titleTextStyle}>{item.comment}</Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 100,
                marginBottom: 10
              }}
            >
              <Text>Comment by: </Text>
              <Text style={{ color: "black" }}>
                {item.commentedBy[0].fullName}
              </Text>
            </View>
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
    const { commentsGot, data } = this.state;
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
      <View style={{ flex: 1, backgroundColor: "#242a38" }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={this._onRefresh}
            />
          }
          //ref="scrollView"
          ref={ref => (this.scrollView = ref)}
          // onContentSizeChange={(contentWidth, contentHeight) => {
          //   this.scrollView.scrollToEnd({ animated: true });
          // }}
        >
          {/* <Header style={{ backgroundColor: "white" }}>
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
            <Right />
          </Header> */}

          {/* <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              borderColor: "grey"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "black" }}>Date: </Text>
              <Text>{data.updatedAt}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ color: "black", marginLeft: 10 }}>Tags: </Text>
              <Text>{data.tags}</Text>
            </View>
          </View> */}
          <View style={{ height: 400, width: "100%", marginBottom: 20 }}>
            <LinearGradient colors={["#282828", "#737373", "#fff"]}>
              <ImageBackground
                source={{ uri: data.photoUrl }}
                style={{
                  height: "100%",
                  width: "100%"
                  //marginBottom: 8,
                  //marginTop: 8
                }}
                resizeMode="cover"
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
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                    //margin: 10,
                    width: "90%",
                    position: "absolute",
                    bottom: 20,
                    left: 20
                  }}
                >
                  {data.title}
                </Text>
              </ImageBackground>
            </LinearGradient>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>Category: </Text>
            <Text style={{ color: "#fff" }}>{data.catagory}</Text>
          </View>
          <View
            style={{
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginBottom: 50
            }}
          >
            <HTMLView value={data.description} stylesheet={styles} />
          </View>
          {/* <Text
            style={{
              color: "black",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 20
            }}
          >
            Comments
          </Text>
          <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 14 }}>
            Swipe left on comment to delete
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
              extraData={commentsGot}
              ref="commentsList"
            />
          </View> */}
        </ScrollView>

        {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            backgroundColor: "white"
          }}
        > */}
        {/* <TextInput
            placeholder="Type a comment..."
            scrollEnabled={true}
            multiline={true}
            onChangeText={commentPost => this.setState({ commentPost })}
            value={this.state.commentPost}
          /> */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Comments", {
              data: this.state.propPostid
            });
          }}
          style={{
            //width: "80%",
            height: 55,
            paddingLeft: 15,
            width: "100%",
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#242a38",
            paddingTop: 8
          }}
        >
          <View
            style={{
              width: "80%",
              borderRadius: 25,
              borderWidth: 1,
              borderColor: "white",
              height: 40
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginTop: 8,
                color: "white"
              }}
            >
              Type a comment...
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.toggleSendIcon()}
          </View>
        </TouchableOpacity>
        {/* </View> */}
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
    color: "#fff"
  },
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "100",
    fontSize: 16,
    color: "black",
    width: "90%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50
  }
});
