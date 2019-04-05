import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  NetInfo,
  YellowBox
} from "react-native";

//YellowBox.ignoreWarnings(["Warning: ReactNative.createElement"]);
import { Fonts } from "./../utils/Font";
import OfflineNotice from "../components/OfflineNotice";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

let date = new Date().toDateString();
export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      refreshing: false,
      loading1: true,
      loading2: true,
      breaking: [],
      pageRefreshing: false,
      isConnected: true
    };
  }

  static navigationOptions = {
    header: null
  };

  renderItem = ({ item }) => {
    return (
      // <TouchableOpacity
      //   onPress={() => {
      //     this.props.navigation.navigate("NewsDetail", { data: item._id });
      //   }}
      // >
      //   <View style={{ flexDirection: "row", width: 380 }}>
      //     <Image
      //       imageStyle={{ borderRadius: 10 }}
      //       source={{ uri: item.photoUrl }}
      //       style={styles.imageThumbStyle}
      //     />
      //     <View style={{ flexDirection: "column" }}>
      //       <Text style={styles.catagoryStyle}>{item.catagory}</Text>

      //       <Text style={styles.titleTextStyle}>
      //         {item.title.substring(0, 30) + "..."}
      //       </Text>
      //       <Text style={{ color: "white" }}>
      //         {item.createdAt.substring(0, 10)}
      //       </Text>
      //     </View>
      //   </View>
      // </TouchableOpacity>
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
          {/* <View style={{ position: "absolute", right: 30, top: 15 }}>
            <Icon name="ios-more" color="white" size={35} />
          </View> */}
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
              fontSize: 16,
              width: "90%"
            }}
          >
            {item.tags.substring(0, 30) + "..."}
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
            {/* <View style={{ flexDirection: "row" }}>
              <Icon name="ios-thumbs-up" size={30} color="white" />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 15,
                  marginTop: 5
                }}
              >
                {item.likes}
              </Text>
            </View> */}
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
            {/* <View
              style={{
                flexDirection: "row",
                position: "absolute",
                right: 30
              }}
            >
              <Icon name="ios-share-alt" size={30} color="white" />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 15,
                  marginTop: 5
                }}
              >
                {item.shares}
              </Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderBreakingItem = ({ item }) => {
    return (
      <View style={styles.containerBig}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("NewsDetail", { data: item._id });
          }}
        >
          <ImageBackground
            source={{ uri: item.photoUrl }}
            imageStyle={{ borderRadius: 10 }}
            style={styles.imageThumbStyleBig}
          >
            <View
              style={{
                paddingTop: 150,
                flexDirection: "row",
                //marginBottom: 10,
                alignContent: "space-around"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                  flex: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#f9f9f9",
                    marginLeft: 5,
                    fontStyle: "normal",
                    fontWeight: "bold",
                    width: "60%"
                  }}
                >
                  {item.title.substring(0, 15) + "..."}
                </Text>

                <Icon
                  name="ios-chatbubbles"
                  size={20}
                  style={{
                    color: "#f9f9f9",
                    position: "absolute",
                    right: 10,
                    top: 20
                    //bottom: 20
                  }}
                >
                  {item.commentsGot.length}
                </Icon>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };
  closeActivityIndicator1 = () =>
    setTimeout(
      () =>
        this.setState({
          loading1: false
        }),
      3000
    );
  closeActivityIndicator2 = () =>
    setTimeout(
      () =>
        this.setState({
          loading2: false
        }),
      3000
    );
  closeRefreshingIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          refreshing: false
        }),
      1000
    );

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  checkConnectionStatus() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillMount() {
    this.checkConnectionStatus();
    this.getBreakingPosts();
    this.getLatestPosts();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  toggleOfflineNotice() {
    if (!this.state.isConnected) {
      return <OfflineNotice />;
    }
    return null;
  }

  getLatestPosts() {
    this.closeActivityIndicator2();
    axios
      .get("http://198.245.53.50:5000/api/posts/" + this.state.page)
      .then(response => {
        console.log(response);
        this.setState({
          dataSource:
            this.state.page === 1
              ? response.data.posts
              : [...this.state.dataSource, ...response.data.posts]
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
  getBreakingPosts() {
    this.closeActivityIndicator1();
    axios
      .get("http://198.245.53.50:5000/api/breaking")
      .then(response => {
        console.log(response.data);
        this.setState({ breaking: response.data.posts });
      })
      .then(() => console.log("News State", this.state.breaking))
      .catch(function(error) {
        console.log("Error Is:", error);
      });
  }

  renderFooter = () => {
    // if (this.state.refreshing) {
    return (
      <View
        style={{
          paddingVertical: 20
          // borderTopWidth: 1,
          // borderTopColor: "#CED0CE"
        }}
      >
        {this.state.refreshing && (
          <ActivityIndicator size="large" color="white" />
        )}
      </View>
    );
    //} else {
    return null;
    //}
  };

  handleLoadMore = () => {
    this.setState({ refreshing: true });
    //this.closeRefreshingIndicator();
    this.setState({ page: this.state.page + 1 }, () => {
      //this.setState({refreshing: flase})
      this.closeRefreshingIndicator();
      this.getLatestPosts();
    });
  };

  _onRefresh = () => {
    this.setState({ pageRefreshing: true, dataSource: [] });
    axios
      .get("http://198.245.53.50:5000/api/breaking")
      .then(response => {
        //console.log(response.data);
        this.setState({ breaking: response.data.posts });
      })
      //.then(() => console.log("News State", this.state.breaking))
      .catch(function(error) {
        console.log("Error Is:", error);
      });
    axios
      .get("http://198.245.53.50:5000/api/posts/1")
      .then(response => {
        console.log(response);
        this.setState({
          dataSource: response.data.posts,
          page: 1
        });
      })
      .then(() => console.log("DataSource", this.state.dataSource))
      .catch(function(error) {
        console.log("error", error);
        //this.setState({refreshing: false})
      });
    setTimeout(
      () =>
        this.setState({
          pageRefreshing: false
        }),
      2000
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#242a38" }}>
        {this.toggleOfflineNotice()}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderColor: "white",
              //borderWidth: 1,
              borderRadius: 25,
              height: 40,
              width: "90%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              alignSelf: "center",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              this.props.navigation.navigate("SearchResult");
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                borderColor: "white",
                //borderWidth: 1,
                borderRadius: 25,
                height: 40,
                width: "90%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                alignSelf: "center",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            > */}
            <Icon
              name="ios-search"
              size={25}
              style={{
                color: "white"
              }}
            />

            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "300",
                //marginTop: 5,
                paddingLeft: 20
              }}
            >
              Search
            </Text>
            {/* </View> */}
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 20,
              fontSize: 16,
              color: "white"
            }}
          >
            {date}
          </Text>
          <Text style={styles.todayText}>Breaking</Text>
          {this.state.loading1 && (
            <ActivityIndicator
              size="large"
              animating={this.state.loading1}
              color="white"
            />
          )}

          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={this.state.breaking}
              keyExtractor={item => item._id}
              renderItem={this.renderBreakingItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* <Text style={(style = styles.todayText)}>Live Videos</Text> */}
          {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: "2%",
                paddingRight: "5%"
              }}
            /> */}

          <Text style={(style = styles.todayText)}>Latest Posts</Text>
          <View
          // style={{
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   marginTop: 10,
          //   paddingLeft: "2%",
          //   paddingRight: "5%"
          // }}
          >
            {this.state.loading2 && (
              <ActivityIndicator
                size="large"
                animating={this.state.loading2}
                color="white"
              />
            )}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.dataSource}
              keyExtractor={item => item._id}
              renderItem={this.renderItem}
              // ItemSeparatorComponent={this.renderSeparator}
              onEndReached={this.handleLoadMore}
              // ListFooterComponent={this.renderFooter}
              onEndReachedThreshold={0}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  todayText: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: Fonts.Indie,
    fontWeight: "bold",
    color: "white"
  },
  imageThumbStyle: {
    height: 80,
    width: 80,
    marginTop: 10,
    marginLeft: 10,
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
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 200,
    fontSize: 25,
    alignItems: "center"
  },
  imageThumbStyleBig: {
    height: 200,
    width: 150,
    marginBottom: 30
  },
  containerBig: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginEnd: 10
  }
});
