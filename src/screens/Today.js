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
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { Header, Left, Right } from "native-base";
import axios from "axios";

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
      loading2: true, dataSource: []
    };

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
 
    this.getLatestPosts()
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
    // headerTitle: "Go Live",
    // headerRight: (
    //   <TouchableOpacity  onPress={()=>this.selectPhotoTapped.bind(this)}>
    //   <Icon
    //     name="tv"

    //     size={30}
    //     style={{ marginRight: 20, color: "#000" }}
    //   />
    //   </TouchableOpacity>
    // )
    header: null
  };
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        //let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: "data:image/jpeg;base64," + response.data };

        this.setState({
          avatarSource: source,
          photoUrl: "data:image/jpeg;base64," + response.data
        });
      }
    });
  }

  onPublishButton() {
    const {
      title,
      category,
      tags,
      description,
      publish,
      breaking,
      photoUrl
    } = this.state;
    //this.setState({publish: true})
    console.log(
      "Data in State:",
      "Title: ",
      title,
      "Category: ",
      category,
      "tags: ",
      tags,
      "description: ",
      description,
      "photoUrl: ",
      photoUrl
    );
    axios
      .post("http://198.245.53.50:5000/api/posts/add", {
        title: title,
        category: category,
        tags: tags,
        description: description,
        publish: true,
        breaking: false,
        photoUrl: photoUrl
      })
      .then(response => {
        console.log("Post Response", response);
      })
      .catch(error => {
        console.log("Post Error", error);
      });
  }

  onSaveButton() {
    const {
      title,
      category,
      tags,
      description,
      publish,
      breaking,
      photoUrl
    } = this.state;
    //this.setState({publish: true})
    console.log(
      "Data in State:",
      "Title: ",
      title,
      "Category: ",
      category,
      "tags: ",
      tags,
      "description: ",
      description,
      "photoUrl: ",
      photoUrl
    );
    axios
      .post("http://198.245.53.50:5000/api/posts/add", {
        title: title,
        category: category,
        tags: tags,
        description: description,
        publish: false,
        breaking: false,
        photoUrl: photoUrl
      })
      .then(response => {
        console.log("Post Response", response);
      })
      .catch(error => {
        console.log("Post Error", error);
      });
  }
  closeActivityIndicator2 = () =>
    setTimeout(
      () =>
        this.setState({
          loading2: false
        }),
      3000
    );
  getLatestPosts() {
    this.closeActivityIndicator2();
    axios
      .get("http://198.245.53.50:5000/api/posts/4")
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
  renderItem = ({ item }) => {
    //item = item.filter(item=>item.breaking === false)
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
            <Text style={{ color: "grey" }}>
              {item.createdAt.substring(0, 10)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <Header style={{ backgroundColor: "white" }}>
            <Left>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 20
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
            this.props.navigation.navigate("PostForm");
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
  }
});
