import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";

export default class Camera extends Component {
  constructor() {
    super();
    this.state = { live: false };
  }

  toggleLive() {
    if (this.state.live) {
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
    if (this.state.live) return <Text style={{ color: "black" }}>00:10</Text>;
    else return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        >
          {this.toggleLive()}
          <TouchableOpacity
            onPress={() => {
              this.setState({ live: !this.state.live });
            }}
          >
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                borderColor: this.state.live ? "red" : "grey",
                width: 100,
                height: 100,
                marginTop: this.state.live ? 400 : 470,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: this.state.live ? "red" : "grey"
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
