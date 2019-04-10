import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  AsyncStorage
} from "react-native";
import Video from "react-native-video";
import Nike from "../../thum/Nike.mp4";
import { Fonts } from "./../utils/Font";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const ACCESS_TOKEN = "access_token";

export default class LiveVideos extends Component {
  constructor() {
    super();
    this.state = { dataSource: [], loading: true };
  }
  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      3000
    );

  componentWillMount() {
    this.closeActivityIndicator();
    axios
      .get("http://198.245.53.50:5000/api/post-by-catagory/Fashion")
      .then(response => this.setState({ dataSource: response.data }));
    //.then(this.setState({loading : false}));
  }

  // async getToken() {
  //   try {
  //     let token = await AsyncStorage.getItem("access_token");
  //     axios
  //       .post("http://198.245.53.50:5000/api/users/check", {
  //         token: token
  //       })
  //       .then(response => {
  //         console.log("Authenticated:", response.data.authenticated);
  //         let authenticated = response.data.authenticated;
  //         this.props.navigation.navigate(authenticated ? "" : "Login");
  //       });
  //   } catch (error) {
  //     console.log("Cannot get token");
  //   }
  // }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("LiveVideoDetail", { data: item._id });
        }}
      >
        <ImageBackground
          source={{ uri: item.photoUrl }}
          imageStyle={{ borderRadius: 10 }}
          style={styles.imageThumbStyle}
        >
          <View style={styles.textViewStyle}>
            <Text style={styles.titleTextStyle}>
              {item.title.substring(0, 30) + "..."}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "70%",
          backgroundColor: "#CED0CE",
          marginLeft: "23%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>
            this.props.navigation.navigate("LiveVideoDetail", {
              data: "Hello World"
            })
          }
        >
          <Video
            source={{
              uri: "http://198.245.53.50:5000/public/uploads/test.webm"
            }}
            ref={ref => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            resizeMode="cover"
            repeat={true}
            controls={true}
            //fullscreen={true}
            paused={false}
          />
        </TouchableOpacity>
        <Text style={styles.todayText}> Live Videos </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 30,
            top: 20,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.props.navigation.navigate("Camera")}
        >
          <Icon name="md-videocam" size={25} />
          <Text>Go Live</Text>
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 30
          }}
        >
          <FlatList
            horizontal={true}
            data={this.state.dataSource}
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
            showsHotizontalScrollIndicator={false}
            //ItemSeparatorComponent={this.renderSeparator}
            //numColumns={2}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todayText: {
    fontSize: 30,
    // marginLeft: 20,
    // marginTop: 20,
    position: "absolute",
    left: 20,
    top: 20,
    marginBottom: 10,
    fontFamily: Fonts.AvenirBlack,
    color: "black"
  },
  backgroundVideo: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    //marginTop: 20,
    // width: "100%",
    // height: "50%",
    borderWidth: 2,
    borderColor: "grey",
    flex: 1
  },
  imageThumbStyle: {
    height: 230,
    width: 160,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    marginRight: 10
  },
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "bold",
    color: "white",
    padding: 8,
    fontSize: 18
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 110,
    fontSize: 25,
    alignItems: "center"
  }
});
