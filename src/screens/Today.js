import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarSource: null, videoSource: null };

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }
  static navigationOptions = {
    headerTitle: "Go Live",
    headerRight: (
      <Icon
        name="tv"
        onPress={() => alert("Go Live Button")}
        size={30}
        style={{ marginRight: 20, color: "#000" }}
      />
    )
  };
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          videoSource: response.uri,
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[
              styles.avatar,
              styles.avatarContainer,
              { marginBottom: 20 },
            ]}
          >
            {this.state.avatarSource === null ? (
             <Icon name="camera-retro" size={35} color="black"  style={{ marginLeft: 20, marginTop: 10}}/>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>

      </View>
        <TextInput placeholder="Title" />
        <TextInput placeholder="Category" />
        <TextInput placeholder="Tags" />
        <TextInput placeholder="Description" />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Save this post")}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => alert("Publish this post")}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
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
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    borderRadius: 25,
    height: 40,
    width: 150,
    marginTop: 10
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#be0e0e",
    borderRadius: 25,
    marginTop: 10,
    height: 40,
    width: 150,
    marginLeft: 20
  }
});
