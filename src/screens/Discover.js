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
  ActivityIndicator
} from "react-native";
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
      breaking: []
    };
  }

  static navigationOptions = {
    header: null
  };
  renderItem = ({ item }) => {
    return (
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
            <Text style={{ color: "white" }}>
              {item.createdAt.substring(0, 10)}
            </Text>
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
            imageStyle={{ borderRadius: 25 }}
            style={styles.imageThumbStyleBig}
          >
            <View
              style={{
                paddingTop: 230,
                flexDirection: "row",
                //marginBottom: 10,
                alignContent: "space-around"
              }}
            >
              <View style={{ flex: 4 }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "white",
                    marginLeft: 5,
                    fontStyle: "normal",
                    fontWeight: "bold"
                  }}
                >
                  {item.title.substring(0, 30) + "..."}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Icon
                  name="ios-chatbubbles"
                  size={30}
                  style={{ color: "grey", marginTop: 80 }}
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
      2000
    );
  componentWillMount() {
    this.getBreakingPosts();
    this.getLatestPosts();
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
    if (this.state.refreshing) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderTopColor: "#CED0CE"
          }}
        >
          {this.state.refreshing && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
      );
    } else {
      return null;
    }
  };
  handleRefresh() {
    this.setState({ refreshing: true });
  }
  handleLoadMore = () => {
    if (this.state.refreshing) {
      return null;
    }
    this.setState(
      prevState => {
        return { refreshing: true, page: prevState.page + 1 };
      },
      () => {
        this.getLatestPosts();
      }
    );
  };
  render() {
    return (
      <ImageBackground
        source={require("../../thum/crop.jpg")}
        style={styles.backgroundImage}
      >
        {this.props.children}
        <View>
          <ScrollView>
            <Text
              style={{
                marginTop: 50,
                marginLeft: 10,
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

            <Text style={(style = styles.todayText)}>Latest Posts</Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: "5%",
                paddingRight: "5%"
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
                s
                ItemSeparatorComponent={this.renderSeparator}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
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
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "Baskerville",
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
    height: 350,
    width: 320,
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
