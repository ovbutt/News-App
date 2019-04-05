import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView
} from "react-native";
import Video from "react-native-video";
import Nike from "../../thum/Nike.mp4";

import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

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
      <ImageBackground
        source={require("./../../thum/liveback.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <ScrollView>
          <View style={{ flex: 1 }}>
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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FlatList
                data={this.state.dataSource}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
                //ItemSeparatorComponent={this.renderSeparator}
                numColumns={2}
              />
            </View>
            {/* <Video
          source={Nike}
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
          paused={true}
        /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  todayText: {
    fontSize: 30,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "Baskerville",
    fontWeight: "bold",
    color: "black"
  },
  backgroundVideo: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    marginTop: 20,
    width: "100%",
    height: "50%",
    borderWidth: 2,
    borderColor: "grey"
  },
  imageThumbStyle: {
    height: 150,
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
