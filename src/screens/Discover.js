import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import BreakingPost from "../components/BreakingPost";
import OtherPosts from "../components/OtherPosts";

let date = new Date().toDateString();
export default class Discover extends Component {
  state = { breaking: [] };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-today" color={tintColor} size={30} />
    )
  };

  componentWillMount() {
    axios
      .get("http://198.245.53.50:5000/api/posts")
      .then(response => {
        console.log(response);
        this.setState({ breaking: response.data });
      })
      .then(() => console.log("News State", this.state.breaking))
      .catch(function(error) {
        console.log("error", error);
      });
  }
  renderBreakingPost() {
    const { breaking } = this.state;
    return breaking
      .filter(
        breaking => breaking.breaking === true && breaking.publish === true
      )
      .map(posts => <BreakingPost key={posts._id} posts={posts} />);
  }
  render() {
    return (
      <ImageBackground
        
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
                color: "grey"
              }}
            >
              {date}
            </Text>
            <Text style={styles.todayText}>Breaking</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row" }}>
                {this.renderBreakingPost()}
              </View>
            </ScrollView>

            <Text style={(style = styles.todayText)}>Latest Posts</Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <OtherPosts />
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
    color: "black"
  }
});
