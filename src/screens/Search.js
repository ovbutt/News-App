import React, { Component } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      // dataSource: [],
      // search: "",
      // loading: false,
      // gotData: true,

      business: "Business",
      world: "World",
      fashion: "Fashion",
      politics: "Politics",
      sports: "Sports",
      health: "Health",
      science: "Science"
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    //const {}
    const { search, loading } = this.state;
    console.log("state: ", this.props.navigation.state);
    return (
      <ImageBackground
        source={require("../../thum/cropLightBlue.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <View>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SearchResult");
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "white",
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name="ios-search" size={30} color="grey" />
                <Text style={{marginLeft: 20, fontSize: 18, fontFamily: '700', color: 'grey'}}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
            <View style={styles.containerCategories}>
              <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 24,
                    color: "white",
                    marginLeft: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    width: '100%'
                  }}
                >
                  Popular Categories
                </Text>
              </View>
              <ScrollView>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "Business"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/business.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        paddingTop: 60,
                        alignItems: "flex-start",
                        backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.business}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "World"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/travel.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle2}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 60,
                        fontSize: 20,
                        backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.world}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "Fashion"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/photography.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        paddingTop: 60,
                        fontSize: 20,
                        alignItems: "flex-start",
                        backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.fashion}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "Politics"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/politic.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle2}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        paddingTop: 60,
                        fontSize: 20,
                        alignItems: "flex-start",
                        backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.politics}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "Sports"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/sports.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        paddingTop: 60,
                        fontSize: 20,
                        alignItems: "flex-start",
                        backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.sports}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "Health"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/health.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle2}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 60,
                        fontSize: 20,
                        backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.health}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 80, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CategoriesView", {
                      category: "Science"
                    });
                  }}
                >
                  <ImageBackground
                    source={require("../../thum/science.jpg")}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.ImageStyle}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 60,
                        // fontSize: 20,
                        // backgroundColor: "rgba()"
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10,
                          fontFamily: "Arial",
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "white"
                        }}
                      >
                        {this.state.science}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              </ScrollView>
            </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
    alignItems: "center",
    width: 350,
    borderRadius: 20
  },
  text: {
    color: "black"
  },
  imageThumbStyle: {
    height: 80,
    width: 80,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    marginRight: 10,
    borderRadius: 5
  },
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 16,
    color: "white",
    paddingTop: 20
  },
  catagoryStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
    paddingTop: 10
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 200,
    fontSize: 25,
    alignItems: "center"
  },
  containerCategories: {
    alignItems: "center",
    justifyContent: "center"
  },
  ImageStyle: {
    marginLeft: '2%',
    width: 165,
    height: 95,
    marginBottom: 10
  },
  ImageStyle2: {
    width: 165,
    height: 95,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: '2%'
  }
});
