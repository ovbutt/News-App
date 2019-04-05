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

const inputProps = {
  //keyboardType: 'default',
  placeholder: "Tags",
  //placeholderTextColor: 'white',
  //autoFocus: true,
  style: {
    fontSize: 18,
    marginVertical: Platform.OS == "ios" ? 10 : -2
    //color: 'black',
    // underlineColorAndroid="grey",
    //selectionColor="white",
    //color: 'white'
  }
};

const horizontalInputProps = {
  //keyboardType: 'default',
  placeholder: "Tags",
  // placeholderTextColor: 'white',
  //autoFocus: true,
  style: {
    fontSize: 18,
    marginVertical: Platform.OS == "ios" ? 10 : -2
    //selectionColor="white",
    //color: 'white'
  }
};

const horizontalScrollViewProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false
};

const ACCESS_ID = "access_id";
//http://198.245.53.50:5000/public/uploads/1554287721094-images.jpg
export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      userId: this.props.navigation.state.params.userId,
      loadingPublish: false,
      loadingSave: false,
      imageResponse: ""
    };
    //this.getToken = this.getToken.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    //this.selectVideoTapped = this.selectVideoTapped.bind(this);
    //this.getToken()
  }

  // componentDidMount(){
  //   this.getToken()
  // }

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

  // async getToken() {
  //   //const { fullName, email } = this.state;
  //   try {
  //     let id = await AsyncStorage.getItem(ACCESS_ID);
  //     this.setState({ userId: id });
  //     console.log("User Id is:", id, "id in state:", this.state.userId);
  //     return id;
  //     //this.removeToken();
  //   } catch (error) {
  //     console.log("Cannot get user id");
  //   }
  // }

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
        description: description,
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

  onSaveButton() {
    this.setState({ loadingSave: true });
    //let id = this.getToken();
    const {
      title,
      category,
      tags,
      description,
      publish,
      breaking,
      photoUrl,
      userId
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
      photoUrl,
      "User Id for post is",
      userId
    );
    axios
      .post("http://198.245.53.50:5000/api/posts/add", {
        title: title,
        catagory: category,
        tags: tags,
        description: description,
        photoUrl: photoUrl,
        userId: userId
      })
      .then(response => {
        console.log("Post Response", response);
        ToastAndroid.showWithGravity(
          "Post added to saved",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        this.props.navigation.goBack();
      })
      .catch(error => {
        ToastAndroid.showWithGravity(
          "Error saving post",
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

  toggleSaveButton() {
    if (this.state.loadingSave) {
      return (
        <ActivityIndicator
          size="large"
          color="#003366"
          style={{ marginRight: 50 }}
        />
      );
    } else {
      return (
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
      );
    }
  }

  togglePublishButton() {
    if (this.state.loadingPublish) {
      return (
        <ActivityIndicator
          size="large"
          color="#f54b64"
          style={{ marginLeft: 50 }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            this.onPublishButtonImage();
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
        {/* <Header style={{ backgroundColor: "white" }}>
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
                  marginTop: 2,
                  width: "100%"
                }}
              >
                Add Post
              </Text>
            </View>
          </Left>
          <Right> */}
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
        {/* </Right> */}
        {/* </Header> */}
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
              inputProps={inputProps}
              inputProps={horizontalInputProps}
              scrollViewProps={horizontalScrollViewProps}
            />
            {/* <TextInput
              fontSize={18}
              onChangeText={category => this.setState({ category })}
              value={this.state.category}
              placeholder="Category"
              underlineColorAndroid="grey"
              selectionColor="grey"
            />

            <TextInput
              fontSize={18}
              onChangeText={tags => this.setState({ tags })}
              value={this.state.tags}
              placeholder="Tags"
              underlineColorAndroid="grey"
              selectionColor="grey"
            /> */}

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
            {/* {this.toggleSaveButton()} */}
            {this.togglePublishButton()}
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
          {/* <Text style={styles.todayText}>
        Go Live
      </Text>
      <Image source={ require('../../thum/thumb-6.jpg')} style={{height: 300 , width: 400}}
      >
      </Image> */}
          {/* <Text>{this.state.tags}</Text> */}
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
