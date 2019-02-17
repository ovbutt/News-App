import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BreakingPost = ({ posts }) => {
  const { title, photoUrl, description, commentsGot } = posts;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate('NewsDetail')}}
      >
        <ImageBackground
          source={{ uri: photoUrl }}
          imageStyle={{ borderRadius: 25 }}
          style={styles.imageThumbStyle}
        >
          <View
            style={{
              paddingTop: 230,
              flexDirection: "row",
              //marginBottom: 10,
              alignContent: "space-around"
            }}
          >
            <View style={{ flex: 4 }}>
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginLeft: 5,
                  fontStyle: "normal",
                  fontWeight: "bold"
                }}
              >
                {title.substring(0,30) + '...'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Icon name="ios-chatbubbles" size={30} style={{ color: 'grey', marginTop: 80 }}>
              {commentsGot.length}
              </Icon>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default BreakingPost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginEnd: 10
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "bold",
    color: "white",
    fontStyle: "italic",
    fontFamily: "Baskerville"
  },
  imageThumbStyle: {
    height: 350,
    width: 320,
    marginBottom: 30
  }
});
