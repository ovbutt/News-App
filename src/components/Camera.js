import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  AsyncStorage
} from "react-native";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
//import SocketIOClient from "socket.io-client";
//import RNFetchBlob from "react-native-fetch-blob";
//var RNFS = require("react-native-fs");

const ACCESS_TOKEN = "access_token";
const ACCESS_ID = "access_id";

const flashModeOrder = {
  off: "on",
  on: "auto",
  auto: "torch",
  torch: "off"
};

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      live: false,
      type: "back",
      flash: "off",
      recordOptions: {
        mute: false,
        //maxDuration: 2,
        quality: RNCamera.Constants.VideoQuality["288p"]
      },
      isRecording: false,
      processing: false,
      userId: ""
    };
    this.getToken();
    //this.socket = SocketIOClient("http://192.168.1.108:8080");
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      let id = await AsyncStorage.getItem(ACCESS_ID);
      this.setState({ userId: id });
      axios
        .post("http://198.245.53.50:5000/api/users/check", {
          token: token
        })
        .then(response => {
          console.log("Authenticated:", response.data.authenticated);
          let authenticated = response.data.authenticated;
          this.props.navigation.navigate(authenticated ? "" : "Login");
        });
    } catch (error) {
      console.log("Cannot get token");
    }
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === "back" ? "front" : "back"
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash]
    });
  }

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          let data1 = new FormData();
          // userid
          let nam = Date.now();
          console.log("N", nam);
          data1.append("file", {
            uri: data.uri,
            type: "video/mp4",
            name: "tadaVideo"
          });
          console.log(data1);
          const config = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
            body: data1
          };
          console.log("Executing Fetch Api");
          fetch("http://192.168.1.106:8080/mob/video", config)
            .then(res => {
              console.log("response on file upload", res);
            })
            .catch(err => {
              console.log("err on file upload", err);
            });
          this.setState({ isRecording: false });
          console.warn(data);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  stopRecording() {
    this.camera.stopRecording();
  }

  // takeVideo = async function() {
  //   this.setState({ isRecording: true });
  //   // default to mp4 for android as codec is not set
  //   const { uri, codec = "mp4" } = await this.camera.recordAsync(
  //     this.state.recordOptions
  //   );
  //   console.log("URI:", uri);
  //   this.setState({ isRecording: false, processing: true });
  //   const type = `video/${codec}`;
  //   //  userid is required
  //   const data = new FormData();
  //   data.append("file", {
  //     name: Date.now(),
  //     type: `video/${codec}`,
  //     uri
  //   });

  //   try {
  //     await fetch("http://192.168.1.106:8080/mob/video", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "multipart/form-data"
  //       },
  //       body: data
  //     })
  //       .then(res => {
  //         console.log("Video Posted:", res);
  //       })
  //       .catch(err => {
  //         console.log("Error video:", err);
  //       });
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   this.setState({ processing: false });
  // };

  // toggleLive() {
  //   if (this.state.isRecording) {
  //     return (
  //       <View
  //         style={{
  //           borderRadius: 20,
  //           borderWidth: 1,
  //           borderColor: "red",
  //           width: 70,
  //           height: 40,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           marginTop: 30
  //         }}
  //       >
  //         <Text
  //           style={{
  //             fontSize: 20,
  //             color: "red"
  //           }}
  //         >
  //           Live
  //         </Text>
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // }

  toggleTime() {
    if (this.state.isRecording)
      return (
        <TouchableOpacity
          onPress={() => {
            this.stopRecording();
          }}
        >
          <ImageBackground
            source={require("./../../thum/camera_button_366472.png")}
            style={{
              width: 120,
              height: 120,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "black" }}>00:00</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    else {
      return (
        <TouchableOpacity
          onPress={() => {
            this.state.isRecording ? () => {} : this.takeVideo();
          }}
        >
          <Image
            source={require("./../../thum/camera_button_366471.png")}
            style={{ width: 120, height: 120 }}
          />
        </TouchableOpacity>
      );
    }
  }

  // takePicture() {
  //   const option = {};

  //   this.camera
  //     .capture({ metadata: option })
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.type}
          flashMode={this.state.flash}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        >
          <View style={{ flexDirection: "row", width: "100%" }}>
            <TouchableOpacity
              onPress={this.toggleFlash.bind(this)}
              style={{
                position: "absolute",
                top: 20,
                left: 30,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="ios-flash" size={40} color="#c5c5c5" />
              <Text style={{ color: "#c5c5c5" }}>{this.state.flash}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.toggleFacing.bind(this)}
              style={{
                position: "absolute",
                top: 20,
                right: 30,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="ios-reverse-camera" size={40} color="#c5c5c5" />
              <Text style={{ color: "#c5c5c5" }}>{this.state.type}</Text>
            </TouchableOpacity>
          </View>
          {/* {this.toggleLive()} */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 30
            }}
          >
            {this.toggleTime()}
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    //justifyContent: "flex-end",
    alignItems: "center"
  }
});
