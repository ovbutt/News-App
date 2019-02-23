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

  // componentWillReceiveProps() {
  //   console.log("componentWillReceiveProps called.");
  //   this.setState({
  //     dataSource: [],
  //     search: "",
  //     loading: false,
  //     gotData: true
  //   });
  // };
  // componentWillUnmount(){
  //   console.log("componentWillUnmount called.");
  //   this.setState({
  //     dataSource: [],
  //     search: "",
  //     loading: false,
  //     gotData: true
  //   });
  // };

  // componentWillFocus(){
  //   console.log("componentWillFocus called.");
  //   this.setState({
  //     dataSource: [],
  //     search: "",
  //     loading: false,
  //     gotData: true
  //   });
  // };

  // componentDidFocus(){
  //   console.log("componentDidFocus called.");
  //   this.setState({
  //     dataSource: [],
  //     search: "",
  //     loading: false,
  //     gotData: true
  //   });
  // };

  // componentWillBlur(){
  //   console.log("componentWillBlur called.");
  //   this.setState({
  //     dataSource: [],
  //     search: "",
  //     loading: false,
  //     gotData: true
  //   });
  // };
  // componentDidBlur(){
  //   console.log("componentDidBlur called.");
  //   this.setState({
  //     dataSource: [],
  //     search: "",
  //     loading: false,
  //     gotData: true
  //   });
  // };

  static navigationOptions = {
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name="ios-search" color={tintColor}  size={30} />
    // )
    header: null
  };

  // renderItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() =>
  //         this.props.navigation.navigate("NewsDetail", { data: item })
  //       }
  //     >
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           paddingLeft: "5%",
  //           paddingRight: "5%"
  //         }}
  //       >
  //         <Image
  //           imageStyle={{ borderRadius: 10 }}
  //           source={{ uri: item.photoUrl }}
  //           style={styles.imageThumbStyle}
  //         />
  //         <View style={{ flexDirection: "column" }}>
  //           <Text style={styles.catagoryStyle}>{item.catagory}</Text>

  //           <Text style={styles.titleTextStyle}>
  //             {item.title.substring(0, 30) + "..."}
  //           </Text>
  //           <Text style={{ color: "white" }}>
  //             {item.createdAt.substring(0, 10)}
  //           </Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  // closeRefreshingIndicator = () =>
  //   setTimeout(
  //     () =>
  //       this.setState({
  //         loading: false
  //       }),
  //     2000
  //   );

  // gotData = () => {
  //   if (!this.state.dataSource.length) {
  //     this.setState({ gotData: false });
  //   } else {
  //     this.setState({ gotData: true });
  //   }
  // };
  // searchIt() {
  //   console.log("SearchState:", this.state.search);
  //   this.closeRefreshingIndicator();
  //   if (!this.state.search.length) {
  //     alert("Please enter a keyword to search");
  //   } else {
  //     axios
  //       .get("http://198.245.53.50:5000/api/search/" + this.state.search)
  //       .then(response => {
  //         console.log(response);
  //         this.setState({ dataSource: response.data });
  //         this.gotData();
  //       })
  //       .then(this.setState({ loading: false }))
  //       .then(() => console.log("DataSource", this.state.dataSource))
  //       .catch(function(error) {
  //         console.log("error", error);
  //       });
  //   } //alert(`Search ${this.state.search}`);
  // }

  // renderSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: "70%",
  //         backgroundColor: "#CED0CE",
  //         marginLeft: "23%"
  //       }}
  //     />
  //   );
  // };

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
            {/* <SearchBar
              showLoading={loading}
              platform="android"
              // cancelButtonTitle="Cancel"
              placeholder="Search"
              cancelButtonProps={{ color: "#bfbfbf" }}
              onChangeText={search => this.setState({ search })}
              value={search}
              onSubmitEditing={() => {
                this.searchIt();
                this.setState({ loading: true });
              }}
              onClear={() => {
                this.setState({
                  dataSource: [],
                  search: "",
                  loading: false,
                  gotData: true
                });
              }}
              onCancel={() => {
                this.setState({
                  dataSource: [],
                  search: "",
                  loading: false,
                  gotData: true
                });
              }}
            /> */}
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
          {/* {!this.state.gotData && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
                No News Found
              </Text>
            </View>
          )} */}
          {/* <View style={{ marginBottom: 170 }}>
            {this.state.dataSource.length ? (
              <FlatList
                data={this.state.dataSource}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
              />
            ) : ( */}
          
          {/* <View style={styles.emptyListStyle}>
             <Text style={styles.emptyMessageStyle}>The list is empty</Text>
          
          </View> */}
          
            <View style={styles.containerCategories}>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 26,
                    color: "white",
                    marginLeft: 10,
                    marginBottom: 10,
                    marginTop: 10
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
              <View style={{ marginBottom: 80 }}>
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
                        {this.state.science}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              </ScrollView>
            </View>
            
          
          {/* )} */}
          {/* </View> */}
          {/* <FlatList
          data={this.state.dataSource}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          
        /> */}
          {/* <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 26,
              color: "white",
              marginLeft: 10,
              marginBottom: 5,
              marginTop: 20
            }}
          >
            Popular Categories
          </Text>
        </View> */}
          {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
          {this.state.names.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.container}
              onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: item.name})}}
            >
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
          {/* <View style={styles.containerCategories}>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'Business'})}}>
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'World'})}}>
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
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'Fashion'})}}>
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'Politics'})}}>
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
          <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'Sports'})}}>
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'Health'})}}>
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
          <View>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CategoriesView', {category: 'Science'})}}>
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
                  {this.state.science}
                </Text>
              </View>
            </ImageBackground>
            </TouchableOpacity>
          </View>
        </View> */}
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
    justifyContent: "space-around"
  },
  ImageStyle: {
    marginLeft: '2%',
    width: 165,
    height: 95,
    marginBottom: 15
  },
  ImageStyle2: {
    width: 165,
    height: 95,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: '2%'
  }
});
