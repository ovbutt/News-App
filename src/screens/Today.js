import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Thumbnail } from "native-base";
import axios from "axios";
import TodayPosts from "../components/TodayPosts";
import YesterdayPosts from "../components/YesterdayPosts";
import OtherPosts from "../components/OtherPosts";

let date = new Date().toDateString();
//let date1 = 2019-02-04 ;

export default class Today extends Component {
  state = { news: [] };

  componentDidMount() {
    axios
      .get("http://198.245.53.50:5000/api/posts")
      .then(response => {
        console.log(response);
        this.setState({ news: response.data });
      })
      .then(() => console.log("News State", this.state.news))
      .catch(function(error) {
        console.log("error", error);
      });
  }
  renderTodayPosts() {
    return this.state.news
      .filter(
        news =>
          news.updatedAt.substring(0, 10) === "2019-02-04" &&
          news.publish === true
      )
      .map(posts => <TodayPosts key={posts._id} posts={posts} />);
  }
  renderYesterdayPosts() {
    return this.state.news.map(posts => (
      <YesterdayPosts key={posts.title} posts={posts} />
    ));
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-star" color={tintColor} size={30} />
    )
  };
  render() {
    return (
      <ScrollView>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={(style = styles.todayText)}>Today</Text>
        {/* {this.renderTodayPosts()} */}
        <Text style={(style = styles.todayText)}>Yesterday</Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10
          }}
        >
          {/* <YesterdayPosts /> */}
        </View>
        <Text style={(style = styles.todayText)}>Other Posts</Text>
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
    );
  }
}

const styles = StyleSheet.create({
  todayText: {
    fontSize: 30,
    marginLeft: 10,
    marginTop: 5,
    fontFamily: "Baskerville",
    fontWeight: "bold",
    color: "black"
  },
  dateText: {
    fontSize: 15,
    marginLeft: 10,
    color: "grey",
    fontFamily: "Baskerville",
    marginTop: 10
  }
});
