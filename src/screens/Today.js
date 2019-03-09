import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PixelRatio,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { Header, Left, Right } from "native-base";
import axios from "axios";
import Swipeout from "react-native-swipeout";


const ACCESS_ID = "access_id";
const ACCESS_TOKEN = "access_token";
export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      videoSource: null,
      title: "",
      category: "",
      tags: "",
      description: "",
      publish: false,
      breaking: false,
      photoUrl: "",
      loading2: true,
      dataSource: [],
      pageRefreshing: false,
      userId: '',
      token: ''
    };
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }

  componentWillMount(){
    this.getToken()
   
  }

  async getToken() {
    //const { fullName, email } = this.state;
    try {
      let id = await AsyncStorage.getItem(ACCESS_ID);
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.setState({ userId: id, token: token });
      console.log("User Id is:", id, "id in state:", this.state.userId);
      this.getLatestPosts(token);
      return id;
      //this.removeToken();
    } catch (error) {
      console.log("Cannot get user id");
    }
  }

  selectVideoTapped() {
    const options = {
      title: "Video Picker",
      takePhotoButtonTitle: "Take Video...",
      mediaType: "video",
      videoQuality: "medium"
    };

    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled video picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }
  static navigationOptions = {
    header: null
  };
  closeActivityIndicator2 = () =>
    setTimeout(
      () =>
        this.setState({
          loading2: false
        }),
      3000
    );
  getLatestPosts(token) {
    this.closeActivityIndicator2();
    axios
      .post("http://198.245.53.50:5000/api/users/profile", {
        token: token
      })
      .then(response => {
        console.log(response);
        this.setState({
          dataSource: response.data.posts
        });
      })
      .then(() => console.log("DataSource", this.state.dataSource))
      .catch(function(error) {
        console.log("error", error);
        //this.setState({refreshing: false})
      });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "23%"
        }}
      />
    );
  };
  renderItem = ({ item }) => {
    var swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => { this.deleteData(item._id) }
      },
      {
        text: "Edit",
        backgroundColor: "#003366",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => { this.editData(item) }
      }
    ];
    //item = item.filter(item=>item.breaking === false)
    return (
      <Swipeout right={swipeoutBtns} style={{ backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("NewsDetail", { data: item._id });
        }}
      >
        
          <View style={{ flexDirection: "row", width: 380 }}>
            <Image
              imageStyle={{ borderRadius: 10 }}
              source={{ uri: item.photoUrl }}
              style={styles.imageThumbStyle}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.catagoryStyle}>{item.catagory}</Text>

              <Text style={styles.titleTextStyle}>
                {item.title.substring(0, 30) + "..."}
              </Text>
              <Text style={{ color: "grey" }}>
                {item.createdAt.substring(0, 10)}
              </Text>
            </View>
          </View>
        
      </TouchableOpacity>
      </Swipeout>
    );
  };

  deleteData(id){
    console.log('Delete id:', id)
    axios.get('http://198.245.53.50:5000/api/delpost/' + id )
    .then(response => {
      console.log('Responce from Delete:', response)
      ToastAndroid.showWithGravity(
        'Post Deleted',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    })
    .catch(error => {
      console.log('Error from delete:', error)
      ToastAndroid.showWithGravity(
        'Error while deleting post',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    })
  }

  editData(item){
    this.props.navigation.navigate('EditPostForm', {data: item})
  }

  _onRefresh = () => {
    this.setState({ pageRefreshing: true });
    this.getLatestPosts(this.state.token)
    //console.log("Idfromprops: ", this.state.propPostid);
    //const { commentsGot, data } = this.state;
    // axios
    //   .get("http://198.245.53.50:5000/api/posts/4")
    //   .then(response => {
    //     this.setState({ dataSource: response.data.posts });
    //     //console.log('DataState:',response.data.commentsGot)
    //   })
    //   .catch(error => console.log("Today Refresh Error:", error));
    // console.log("Data State:", data);
    // this.setState({ commentsGot : data.commentsGot });
    //console.log("Comments Got:", commentsGot);
    
    setTimeout(
      () =>
        this.setState({
          pageRefreshing: false
        }),
      500
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Header style={{ backgroundColor: "white" }}>
            <Left>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 20,
                  width: "80%"
                }}
              >
                Go Live
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => {
                  this.selectVideoTapped();
                }}
              >
                <Icon
                  name="tv"
                  size={30}
                  style={{ marginRight: 20, color: "#000" }}
                />
              </TouchableOpacity>
            </Right>
          </Header>

          <View>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 20
              }}
            >
              My Posts
            </Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: "5%",
                paddingRight: "5%",
                marginBottom: 10
              }}
            >
              {this.state.loading2 && (
                <ActivityIndicator
                  size="large"
                  animating={this.state.loading2}
                  color="#003366"
                />
              )}
              <FlatList
                data={this.state.dataSource}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                //refreshing={this.state.refreshing}
                //onRefresh={this.handleRefresh}
                // ListHeaderComponent={() =>
                //   !this.state.dataSource.length ? (
                //     <Text style={{ fontSize: 16, color: "white" }}>
                //       No Latest News
                //     </Text>
                //   ) : null
                // }
                // ListFooterComponent={this.renderFooter}
                // //onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={0.5}
              />
              {/* </View> */}
              {/* LatestPostsDataFinish */}
            </View>
          </View>
          {/* <View
            style={{ flex: 1,
              justifyContent: "center",
              alignItems: "center" , marginTop: 200}}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
              Press "+" button to Add new Post.
            </Text>
          </View> */}
        </ScrollView>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            position: "absolute",
            bottom: 15,
            right: 15,
            height: 60,
            backgroundColor: "#003366",
            borderRadius: 100
          }}
          onPress={() => {
            this.props.navigation.navigate("PostForm", {userId: this.state.userId});
          }}
        >
          <Icon name="plus" size={25} color="#fff" />
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    borderRadius: 25,
    height: 40,
    width: 120,
    marginTop: 10
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#be0e0e",
    borderRadius: 25,
    marginTop: 10,
    height: 40,
    width: 120,
    marginLeft: 20
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    borderRadius: 75,
    width: 130,
    height: 130
  },
  imageThumbStyle: {
    height: 80,
    width: 80,
    marginTop: 10,
    //marginLeft: 10,
    marginBottom: 2,
    marginRight: 10,
    borderRadius: 5
  },
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 16,
    color: "black",
    paddingTop: 10,
    paddingBottom: 10
  },
  catagoryStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 14,
    color: "grey",
    paddingTop: 10
  }
});
