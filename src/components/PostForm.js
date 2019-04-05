import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PixelRatio,
  Picker,
  PickerIOS,
  ToastAndroid,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { Header, Left, Right } from "native-base";
import axios from "axios";
import TagInput from "react-native-tag-input";

const horizontalInputProps = {
  placeholder: "Tags",
  placeholderTextColor: "white",
  //selectionColor="#fff",
  //autoFocus: true,
  style: {
    fontSize: 18,
    marginVertical: Platform.OS == "ios" ? 10 : -2,
    color: "white"
  }
};

const horizontalScrollViewProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false
};

const ACCESS_ID = "access_id";

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      //videoSource: null,
      title: "",
      category: "Business",
      tags: [],
      description: "",
      publish: false,
      breaking: false,
      photoUrl: "",
      text: "",
      userId: this.props.navigation.state.params.userId,
      loadingPublish: false,
      loadingSave: false,
      imageResponse: ""
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      avatarSource: null,
      //videoSource: null,
      title: "",
      category: "",
      tags: [],
      description: "",
      publish: false,
      breaking: false,
      photoUrl: "",
      text: "",
      userId: "",
      loadingPublish: false,
      loadingSave: false
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
          photoUrl: response.uri,
          imageResponse: response
        });
        console.log(
          "AvatarSource: ",
          this.state.avatarSource,
          "Photo Url: ",
          this.state.photoUrl
        );
      }
    });
  }

  onPublishButtonImage() {
    const { imageResponse } = this.state;
    console.log("Publish Image function called");
    let data = new FormData();
    data.append("file", {
      uri: imageResponse.uri,
      type: imageResponse.type,
      name: imageResponse.fileName
    });
    console.log(data);
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: data
    };
    console.log("Executing Fetch Api");
    fetch("http://198.245.53.50:5000/api/files/upload", config)
      .then(res => {
        console.log("response on file upload", res);
        let imageURL = JSON.parse(res._bodyText).url;
        {
          this.onPublishButton(imageURL);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  onPublishButton(imageURL) {
    this.setState({ loadingPublish: true });
    //let id = this.getToken();
    const { title, category, tags, description, userId } = this.state;
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
      imageURL,
      "User Id for post is",
      userId
    );
    axios
      .post("http://198.245.53.50:5000/api/posts/add", {
        title: title,
        catagory: category,
        tags: tags,
        description: "<p>" + description + "</p>",
        publish: true,
        photoUrl: imageURL,
        addedByUser: userId
      })
      .then(response => {
        ToastAndroid.showWithGravity(
          "Post added to publish",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        console.log("Post Response", response);
        this.props.navigation.goBack();
      })
      .catch(error => {
        ToastAndroid.showWithGravity(
          "Error publishing post",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        console.log("Post Error", error);
      });
  }

  onChangeText = text => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [",", " ", ";", "\n"];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: ""
      });
    }
  };

  togglePublishButton() {
    if (this.state.loadingPublish) {
      return (
        <ActivityIndicator
          size="large"
          color="#f54b64"
          style={{ marginLeft: 30 }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            if (!this.state.imageResponse) {
              alert("Please add an Image");
            } else if (!this.state.title) {
              alert("Please enter title for the post");
            } else if (!this.state.category) {
              alert("Please select a category");
            } else if (this.state.tags.length == 0) {
              alert("Please enter tags");
            } else if (!this.state.description) {
              alert("Please enter description");
            } else {
              this.onPublishButtonImage();
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
            Publish
          </Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "#242a38" }}>
        <Icon
          name="ios-arrow-round-back"
          color="#fff"
          size={40}
          style={{ marginTop: 20, marginLeft: 20 }}
          onPress={() => this.props.navigation.goBack()}
        />
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
                  <Text style={{ fontSize: 14, color: "#f54b64" }}>
                    Select a Photo
                  </Text>
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
              placeholderTextColor="white"
              fontSize={18}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
              placeholder="Title"
              underlineColorAndroid="white"
              selectionColor="white"
              style={{ color: "white" }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginLeft: 5,
                fontWeight: "500"
              }}
            >
              Please select a catagory
            </Text>

            <Picker
              selectedValue={this.state.category}
              style={{ height: 60, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ category: itemValue })
              }
              itemStyle={{ backgroundColor: "#242a38" }}
            >
              <Picker.Item label="Business" value="Business" color="#f54b64" />
              <Picker.Item label="World" value="World" color="#f54b64" />
              <Picker.Item label="Fashion" value="Fashion" color="#f54b64" />
              <Picker.Item label="Politics" value="Politics" color="#f54b64" />
              <Picker.Item label="Sports" value="Sports" color="#f54b64" />
              <Picker.Item label="Health" value="Health" color="#f54b64" />
              <Picker.Item label="Science" value="Science" color="#f54b64" />
            </Picker>

            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginLeft: 5,
                fontWeight: "500",
                marginBottom: 10
              }}
            >
              Please enter tags
            </Text>

            <TagInput
              value={this.state.tags}
              onChange={tags => this.setState({ tags })}
              labelExtractor={email => email}
              text={this.state.text}
              onChangeText={this.onChangeText}
              tagColor="#f54b64"
              tagTextColor="white"
              //inputProps={inputProps}
              inputProps={horizontalInputProps}
              scrollViewProps={horizontalScrollViewProps}
            />

            <TextInput
              placeholderTextColor="white"
              fontSize={18}
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
              placeholder="Description"
              multiline={true}
              numberOfLines={5}
              scrollEnabled={true}
              editable={true}
              {...this.props}
              //underlineColorAndroid='grey'
              selectionColor="white"
              style={{
                borderColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 10,
                marginBottom: 20,
                color: "white"
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
            {this.togglePublishButton()}
          </View>
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
    backgroundColor: "#f54b64",
    borderRadius: 25,
    marginTop: 10,
    height: 45,
    width: "90%"
  },
  avatarContainer: {
    borderColor: "#fff",
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
