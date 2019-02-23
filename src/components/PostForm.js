import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PixelRatio
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { Header, Left, Right } from "native-base";
import axios from "axios";

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      //videoSource: null,
      title: "",
      category: "",
      tags: "",
      description: "",
      publish: false,
      breaking: false,
      photoUrl: ""
    };

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    //this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }
  componentWillUnmount() {
    this.setState({
      avatarSource: null,
      //videoSource: null,
      title: "",
      category: "",
      tags: "",
      description: "",
      publish: false,
      breaking: false,
      photoUrl: ""
    });
  }
  static navigationOptions = {
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

  render() {
    return (
      <ScrollView>
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="ios-arrow-back"
                  size={30}
                  style={{ color: "#000", marginLeft: 10, marginRight: 10 }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 30,
                  marginTop: 2
                }}
              >
                Add Post
              </Text>
            </View>
          </Left>
          <Right>
            {/* <TouchableOpacity
            onPress={() => {
              this.selectVideoTapped();
            }}
          >
            <IconFA
              name="tv"
              size={30}
              style={{ marginRight: 20, color: "#000" }}
            />
          </TouchableOpacity> */}
          </Right>
        </Header>
        <View style={{ marginTop: 20 }}>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View
                style={[
                  styles.avatar,
                  styles.avatarContainer,
                  { marginBottom: 20 }
                ]}
              >
                {this.state.avatarSource === null ? (
                  <Text>Select a Photo</Text>
                ) : (
                  <Image
                    style={styles.avatar}
                    source={this.state.avatarSource}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <TextInput
              fontSize={20}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
              placeholder="Title"
              underlineColorAndroid="grey"
              selectionColor="grey"
            />
            <TextInput
              fontSize={20}
              onChangeText={category => this.setState({ category })}
              value={this.state.category}
              placeholder="Category"
              underlineColorAndroid="grey"
              selectionColor="grey"
            />

            <TextInput
              fontSize={20}
              onChangeText={tags => this.setState({ tags })}
              value={this.state.tags}
              placeholder="Tags"
              underlineColorAndroid="grey"
              selectionColor="grey"
            />

            <TextInput
              fontSize={20}
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
              placeholder="Description"
              multiline={true}
              numberOfLines={5}
              scrollEnabled={true}
              editable={true}
              {...this.props}
              //underlineColorAndroid='grey' selectionColor='grey'
              style={{
                borderColor: "grey",
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 10,
                marginBottom: 20
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 50
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.onSaveButton();
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.onPublishButton();
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
                Publish
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.todayText}>
        Go Live
      </Text>
      <Image source={ require('../../thum/thumb-6.jpg')} style={{height: 300 , width: 400}}
      >
      </Image> */}
        </View>
      </ScrollView>
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
  }
});
