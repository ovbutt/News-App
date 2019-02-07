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

const TodayPosts = ({ posts }) => {
  const { title, photoUrl, description, commentsGot  } = posts;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <ImageBackground
          source={{uri:photoUrl}}
          imageStyle={{ borderRadius: 25 }}
          style={styles.imageThumbStyle}
        >
          <View
            style={{ 
                paddingTop: 250,
                flexDirection: "row",
                //marginBottom: 10,
                alignContent: 'space-around'
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
                {title + '...'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Icon name="ios-chatbubbles" size={30} style={{marginTop: 100}}>
               {commentsGot.length}
              </Icon>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default TodayPosts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 30,
    fontFamily: "bold",
    color: "white",
    fontStyle: "italic",
    fontFamily: "Baskerville"
  },
  imageThumbStyle:{
    height: 400,
    width: 370,
    marginBottom: 30
  }
});
