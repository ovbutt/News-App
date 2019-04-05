import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { RNCamera } from "react-native-camera";

import Icon from "react-native-vector-icons/Ionicons";

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
        maxDuration: 2,
        quality: RNCamera.Constants.VideoQuality["288p"]
      },
      isRecording: false
    };
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
          this.setState({ isRecording: false });
          console.warn(data);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  toggleLive() {
    if (this.state.isRecording) {
      return (
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "red",
            width: 70,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "red"
            }}
          >
            Live
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  toggleTime() {
    if (this.state.isRecording)
      return (
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
      );
    else {
      return (
        <Image
          source={require("./../../thum/camera_button_366471.png")}
          style={{ width: 120, height: 120 }}
        />
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
          {this.toggleLive()}
          <TouchableOpacity
            onPress={() => {
              //this.setState({ live: !this.state.live });
              this.state.isRecording ? () => {} : this.takeVideo();
              //this.takePicture();
            }}
            style={{ marginTop: this.state.isRecording ? 400 : 470 }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.toggleTime()}
            </View>
          </TouchableOpacity>
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
