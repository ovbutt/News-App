import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
  Modal,
  Alert,
  ToastAndroid
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers
} from "react-native-popup-menu";

const ACCESS_TOKEN = "access_token";
const ACCESS_EMAIL = "access_email";
const ACCESS_NAME = "access_name";
const ACCESS_ID = "access_id";

export default class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      fullName: "",
      email: "",
      loading2: true,
      dataSource: [],
      userId: "",
      pageRefreshing: false,
      modalVisible: false,
      opened: false
    };
    //this.getToken();
  }
  static navigationOptions = {
    header: null
  };

  async getToken() {
    const { fullName, email } = this.state;
    try {
      let id = await AsyncStorage.getItem(ACCESS_ID);
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      let fullName = await AsyncStorage.getItem(ACCESS_NAME);
      let email = await AsyncStorage.getItem(ACCESS_EMAIL);
      this.setState({
        token: token,
        fullName: fullName,
        email: email,
        userId: id
      });
      console.log("Token is", token);
      this.getLatestPosts(id);
    } catch (error) {
      console.log("Cannot get token");
    }
  }
  componentWillMount() {
    this.getToken();
    //this.getLatestPosts();
  }
  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(ACCESS_EMAIL);
      await AsyncStorage.removeItem(ACCESS_NAME);
      await AsyncStorage.removeItem(ACCESS_ID);
      console.log("Token removed");
      {
        this.props.navigation.navigate("Login");
      }
      //this.getToken();
    } catch (error) {
      console.log("Cannot remove token");
    }
  }
  closeActivityIndicator2 = () =>
    setTimeout(
      () =>
        this.setState({
          loading2: false
        }),
      3000
    );
  getLatestPosts(id) {
    this.closeActivityIndicator2();
    axios
      .get("http://198.245.53.50:5000/api/getMyposts/" + id)
      .then(response => {
        console.log("Response in myPosts", response.data[0].posts);
        this.setState({
          dataSource: response.data[0].posts
        });
      })
      // .then(() => console.log("DataSource", this.state.dataSource))
      .catch(function(error) {
        console.log("Error in getting my posts", error);
        this.setState({ refreshing: false });
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

  deleteData(id) {
    console.log("Delete id:", id);
    axios
      .get("http://198.245.53.50:5000/api/delpost/" + id)
      .then(response => {
        console.log("Responce from Delete:", response);
        ToastAndroid.showWithGravity(
          "Post Deleted",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      })
      .catch(error => {
        console.log("Error from delete:", error);
        ToastAndroid.showWithGravity(
          "Error while deleting post",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  }

  renderItem = ({ item }) => {
    //item = item.filter(item=>item.breaking === false)
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("NewsDetail", { data: item._id });
        }}
      >
        <View
          style={{
            marginLeft: 20,
            width: "90%",
            height: 440,
            elevation: 5,
            borderRadius: 10,
            borderColor: "grey",
            //borderWidth: 1,
            marginBottom: 20,
            shadowColor: "white"
          }}
        >
          <View
            style={{ position: "absolute", right: -30, top: 15, zIndex: 1000 }}
          >
            <MenuProvider skipInstanceCheck={true} backHandler={true} closeMenu>
              <Menu
                style={{
                  height: 70,
                  width: 100
                }}
                renderer={renderers.SlideInMenu}
                name="popupMenu"
              >
                <MenuTrigger>
                  <Icon name="ios-more" color="white" size={35} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={() =>
                      this.props.navigation.navigate("EditPostForm", {
                        data: item
                      })
                    }
                  >
                    <Text style={{ color: "black", fontSize: 16 }}>Edit</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() =>
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
                            onPress: () => this.deleteData(item._id)
                          }
                        ]
                      )
                    }
                  >
                    <Text style={{ color: "red", fontSize: 16 }}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </MenuProvider>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 20
            }}
          >
            <Image
              source={require("./../../thum/thumb-6.jpg")}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#f54b64"
              }}
            />
            <View
              style={{ flexDirection: "column", marginLeft: 10, width: "100%" }}
            >
              <Text
                style={{
                  color: "white",
                  marginLeft: 5,
                  marginTop: 5,
                  fontSize: 18,
                  width: "100%"
                }}
              >
                {item.addedByUser[0] != null
                  ? item.addedByUser[0].fullName
                  : ""}
              </Text>
              <Text style={{ marginLeft: 5, marginTop: 5, color: "grey" }}>
                {item.createdAt.substring(0, 10)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "#f54b64",
              marginLeft: 20,
              marginTop: 10,
              fontSize: 16
            }}
          >
            {item.tags}
          </Text>
          <Text
            style={{
              color: "#fff",
              marginLeft: 15,
              marginTop: 10,
              fontSize: 16,
              marginBottom: 10
            }}
          >
            {item.title.substring(0, 60) + "..."}
          </Text>
          <Image
            source={{ uri: item.photoUrl }}
            style={{ width: "100%", height: "50%" }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Icon name="ios-chatbubbles" size={30} color="white" />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 15,
                  marginTop: 5
                }}
              >
                {item.commentsGot.length}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _onRefresh = () => {
    this.setState({ pageRefreshing: true });
    this.getLatestPosts(this.state.userId);

    setTimeout(
      () =>
        this.setState({
          pageRefreshing: false
        }),
      500
    );
  };

  render() {
    const { fullName, email } = this.state;
    const { push } = this.props.navigation;
    console.log("Name:", fullName, "Email:", email);
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#242a38"
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.pageRefreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Icon
          name="ios-add"
          style={{ position: "absolute", top: 20, right: 30 }}
          color="#f54b64"
          size={40}
          onPress={() => {
            this.props.navigation.navigate("PostForm", {
              userId: this.state.userId
            });
          }}
        />
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              // alignItems: "center",
              // justifyContent: "center",
              marginTop: 20,
              flexDirection: "row",
              marginLeft: 30
            }}
          >
            <Icon name="ios-contact" color="white" size={100} />

            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
                marginLeft: 20,
                width: "100%"
              }}
            >
              <Text style={styles.nameEmailText}>{fullName}</Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Arial",
                  color: "grey"
                }}
              >
                {email}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            // height: 40,
            borderRadius: 20
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.removeToken();
            }}
            style={styles.button2}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "300" }}>
              SIGN OUT
            </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
        <Text
          style={{
            color: "white",
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
            marginTop: 20,
            marginBottom: 10
          }}
        >
          {this.state.loading2 && (
            <ActivityIndicator
              size="large"
              animating={this.state.loading2}
              color="white"
            />
          )}
          <FlatList
            data={this.state.dataSource}
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
            //ItemSeparatorComponent={this.renderSeparator}
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <Text>Edit</Text>
            <Text>Delete</Text>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#C0C0C0",
    alignItems: "center"
  },
  text: {
    color: "#4f603c"
  },
  nameEmailText: {
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: "Arial",
    fontWeight: "700",
    color: "white",
    width: "95%"
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f54b64",
    // padding: 10,
    borderRadius: 25,
    // paddingLeft: 30,
    // paddingRight: 30,
    marginTop: 10,
    height: 40,
    width: "90%"
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
    color: "white",
    paddingTop: 10,
    paddingBottom: 10
  },
  catagoryStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
    paddingTop: 10
  }
});
