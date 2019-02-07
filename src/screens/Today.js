import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image

} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Thumbnail } from "native-base";
import axios from "axios";
import TodayPosts from "../components/TodayPosts";
import YesterdayPosts from "../components/YesterdayPosts";
import OtherPosts from "../components/OtherPosts";

//let date = new Date().toDateString();
//let date1 = 2019-02-04 ;

export default class Today extends Component {
  // state = { news: [] };

  // componentDidMount() {
  //   axios
  //     .get("http://198.245.53.50:5000/api/posts")
  //     .then(response => {
  //       console.log(response);
  //       this.setState({ news: response.data });
  //     })
  //     .then(() => console.log("News State", this.state.news))
  //     .catch(function(error) {
  //       console.log("error", error);
  //     });
  // }
  // renderTodayPosts() {
  //   return this.state.news
  //     .filter(
  //       news =>
  //         news.updatedAt.substring(0, 10) === "2019-02-04" &&
  //         news.publish === true
  //     )
  //     .map(posts => <TodayPosts key={posts._id} posts={posts} />);
  // }
  // renderYesterdayPosts() {
  //   return this.state.news.map(posts => (
  //     <YesterdayPosts key={posts.title} posts={posts} />
  //   ));
  // }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" color={tintColor} size={30} />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.todayText}>
          Go Live
        </Text>
        <Image source={ require('../../thum/thumb-6.jpg')} style={{height: 300 , width: 400}}
        >
        </Image>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});
