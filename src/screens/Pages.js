import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const ACCESS_TOKEN = "access_token";
const ACCESS_EMAIL = "access_email";
const ACCESS_NAME = "access_name";
const ACCESS_ID = "access_id";

export default class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", fullName: "", email: "", loading2: true, dataSource: [] };
    this.getToken();
  }
  static navigationOptions = {
    header : null
  };

  async getToken() {
    const { fullName, email } = this.state;
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      let fullName = await AsyncStorage.getItem(ACCESS_NAME);
      let email = await AsyncStorage.getItem(ACCESS_EMAIL);
      this.setState({ token: token, fullName:fullName, email: email });
      // axios
      //   .post("http://198.245.53.50:5000/api/users/profile", {
      //     token: token
      //   })
      //   .then(response => {
      //     console.log(response);
      //     this.setState({
      //       fullName: response.data.fullName,
      //       email: response.data.email
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      console.log("Token is", token);
      //this.removeToken();
    } catch (error) {
      console.log("Cannot get token");
    }
  }
  componentWillMount() {
    //this.getToken();
    this.getLatestPosts();
  }
  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(ACCESS_EMAIL);
      await AsyncStorage.removeItem(ACCESS_NAME);
      await AsyncStorage.removeItem(ACCESS_ID);
      console.log("Token removed");
      {this.props.navigation.navigate('Login')}
      //this.getToken();
    } catch (error) {
      console.log("Cannot remove token");
    }
  }
  closeActivityIndicator2 = () =>
    setTimeout(
      () =>
        this.setState({
          loading2: false
        }),
      3000
    );
  getLatestPosts() {
    this.closeActivityIndicator2();
    axios
      .get("http://198.245.53.50:5000/api/posts/4")
      .then(response => {
        console.log(response);
        this.setState({
          dataSource:
            this.state.page === 1
              ? response.data.posts
              : [...this.state.dataSource, ...response.data.posts]
        });
      })
      .then(() => console.log("DataSource", this.state.dataSource))
      .catch(function(error) {
        console.log("error", error);
        //this.setState({refreshing: false})
      });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "23%"
        }}
      />
    );
  };
  renderItem = ({ item }) => {
    //item = item.filter(item=>item.breaking === false)
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("NewsDetail", { data: item._id });
        }}
      >
        <View style={{ flexDirection: "row", width: 380 }}>
          <Image
            imageStyle={{ borderRadius: 10 }}
            source={{ uri: item.photoUrl }}
            style={styles.imageThumbStyle}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.catagoryStyle}>{item.catagory}</Text>

            <Text style={styles.titleTextStyle}>
              {item.title.substring(0, 30) + "..."}
            </Text>
            <Text style={{ color: "white" }}>
              {item.createdAt.substring(0, 10)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { fullName, email } = this.state;
    const { push } = this.props.navigation;
    console.log('Name:',fullName, 'Email:' , email);
    return (
      <ImageBackground
        source={require('../../thum/profileWallpaper.jpg')}
        style={{height: '100%', width: '100%'}}
      >
      <ScrollView>
      <View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: "normal",
              color: "white",
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 20
            }}
          >
            Profile
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
          <View style={{flexDirection: 'row', borderColor: 'white', borderWidth: 1, borderRadius: 25, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}
          >

            <Icon name="ios-contact" color='white' size={80} />
          </View>
          
          <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <Text style={styles.nameEmailText}>Name: </Text>
              <Text style={styles.nameEmailText}>{fullName}</Text>
            </View>
            
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <Text style={styles.nameEmailText}>Email: </Text>
              <Text style={styles.nameEmailText}>{email}</Text>
            </View>
            </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                
                onPress={() => {
                  this.removeToken();
                }}
                style={styles.button2}
              >
              <Text style={{color: 'white', fontSize: 18, fontWeight:'500'}}>Log Out</Text>
              </TouchableOpacity>
            
            
          </View>
        </View>
      </View>
      <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 20, marginTop: 20}}>My Posts</Text>
      <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: "5%",
                paddingRight: "5%",
                marginBottom: 10
              }}
            >
              {this.state.loading2 && (
                <ActivityIndicator
                  size="large"
                  animating={this.state.loading2}
                  color="white"
                />
              )}
              <FlatList
                data={this.state.dataSource}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                //refreshing={this.state.refreshing}
                //onRefresh={this.handleRefresh}
                // ListHeaderComponent={() =>
                //   !this.state.dataSource.length ? (
                //     <Text style={{ fontSize: 16, color: "white" }}>
                //       No Latest News
                //     </Text>
                //   ) : null
                // }
                // ListFooterComponent={this.renderFooter}
                // //onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={0.5}
              />
              {/* </View> */}
              {/* LatestPostsDataFinish */}
            </View>
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#C0C0C0",
    alignItems: "center"
  },
  text: {
    color: "#4f603c"
  },
  nameEmailText: {
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: "Arial",
    fontWeight: "700",
    color: "white"
  },
  button2: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#003366",
    // padding: 10,
    borderRadius: 25,
    // paddingLeft: 30,
    // paddingRight: 30,
    marginTop: 10,
    height: 40,
    width: 300,
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
    paddingTop: 10,
    paddingBottom: 10
  },
  catagoryStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
    paddingTop: 10
  }
});
