import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

class OtherPosts extends Component {
  constructor() {
    super();
    this.state = { dataSource: [], loading: false };
  }

  renderItem = ({ item }) => {
    //item = item.filter(item=>item.breaking === false)
    return (
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
          <Text>
            {item.createdAt.substring(0,10)}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("http://198.245.53.50:5000/api/posts")
      .then(response => {
        console.log(response);
        this.setState({ dataSource: response.data });
      })
      .then(() => console.log("DataSource", this.state.dataSource))
      //.then(this.setState({ loading: false }))
      .catch(function(error) {
        console.log("error", error);
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
  // renderList() {
  //   if (this.state.loading) {
  //     return <ActivityIndicator size="large" />;
  //   } else {
  //     return (
        
  //     );
  //   }
  // }
  render() {
    //this.setState({loading:false})
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center", width: 380 }}
      >
        <FlatList
          data={this.state.dataSource.filter(
            dataSource =>
              dataSource.breaking === false && dataSource.publish === true
          )}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          //onEndReachedThreshold={5}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

// const YesterdayPosts = ({ posts }) => {
//   //const { title, photoUrl, description } = posts;

//   renderItem = ({ posts }) => {
//     const { title, photoUrl } = posts;
//     return (
//       <ImageBackground
//         source={{ uri: photoUrl }}
//         imageStyle={{ borderRadius: 10 }}
//         style={styles.imageThumbStyle}
//       >
//         <View style={styles.textViewStyle}>
//           <Text style={styles.titleTextStyle}>{title}</Text>
//         </View>
//       </ImageBackground>
//     );
//   };
//   return (
//     <View>
//       <FlatList data={posts} renderItem={this.renderItem} />
//     </View>
//   );
// };

export default OtherPosts;

const styles = StyleSheet.create({
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
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 200,
    fontSize: 25,
    alignItems: "center"
  }
});
