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
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { Header, Left, Right } from "native-base";
import axios from "axios";
import TagInput from "react-native-tag-input";

const inputProps = {
  placeholder: "Tags"
};

const horizontalInputProps = {
  placeholder: "Tags",
  style: {
    fontSize: 18,
    marginVertical: Platform.OS == "ios" ? 10 : -2
  }
};

const horizontalScrollViewProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false
};

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    let data = this.props.navigation.state.params.data;
    this.state = {
      avatarSource: data.photoUrl,
      //videoSource: null,
      //data: ,
      title: data.title,
      category: data.catagory,
      tags: [data.tags],
      description: data.description,
      publish: false,
      breaking: false,
      photoUrl: data.photoUrl,
      text: "",
      id: data._id,
      loadingPublish: false,
      loadingSave: false
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
      id: '',
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
          photoUrl: "data:image/jpeg;base64," + response.data
        });
      }
    });
  }
  onPublishButton() {
    this.setState({loadingPublish: true})
    const { title, category, tags, description, photoUrl } = this.state;
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
      .post("http://198.245.53.50:5000/api/posts/edit/" + this.state.id, {
        title: title,
        catagory: category,
        tags: tags,
        description: description,
        publish: true,
        photoUrl: photoUrl
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
    this.setState({loadingSave: true})
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
      .post("http://198.245.53.50:5000/api/posts/edit/" + this.state.id, {
        title: title,
        catagory: category,
        tags: tags,
        description: description,
        photoUrl: photoUrl
      })
      .then(response => {
        console.log("Post Edit Response", response);
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
        console.log("Post Edit Error", error);
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
          color="#be0e0e"
          style={{ marginLeft: 50 }}
        />
      );
    } else {
      return (
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
      );
    }
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
                  marginTop: 2,
                  width: "100%"
                }}
              >
                Add Post
              </Text>
            </View>
          </Left>
          <Right>
            
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
                    source={{ uri: this.state.photoUrl }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <TextInput
              fontSize={18}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
              placeholder="Title"
              underlineColorAndroid="grey"
              selectionColor="grey"
            />
            <Text
              style={{
                color: "black",
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
            >
              <Picker.Item label="Business" value="Business" />
              <Picker.Item label="World" value="World" />
              <Picker.Item label="Fashion" value="Fashion" />
              <Picker.Item label="Politics" value="Politics" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Health" value="Health" />
              <Picker.Item label="Science" value="Science" />
            </Picker>

            <Text
              style={{
                color: "black",
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
              tagColor="#003366"
              tagTextColor="white"
              inputProps={inputProps}
              inputProps={horizontalInputProps}
              scrollViewProps={horizontalScrollViewProps}
            />

            <TextInput
              fontSize={18}
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
            {this.toggleSaveButton()}
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
