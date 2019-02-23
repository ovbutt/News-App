import React, { Component } from "react";
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
import { SearchBar } from "react-native-elements";
import { Header, Left, Right } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      search: "",
      loading: false,
      gotData: true,

      business: "Business",
      world: "World",
      fashion: "Fashion",
      politics: "Politics",
      sports: "Sports",
      health: "Health",
      science: "Science"
    };
  }
  componentWillUnmount() {
    this.setState({
      dataSource: [],
      search: "",
      loading: false,
      gotData: true
    });
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("NewsDetail", { data: item })
        }
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: "5%",
            paddingRight: "5%"
          }}
        >
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
            <Text style={{ color: "grey" }}>
              {item.createdAt.substring(0, 10)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  closeRefreshingIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      2000
    );

  gotData = () => {
    if (!this.state.dataSource.length) {
      this.setState({ gotData: false });
    } else {
      this.setState({ gotData: true });
    }
  };
  searchIt() {
    console.log("SearchState:", this.state.search);
    this.closeRefreshingIndicator();
    if (!this.state.search.length) {
      alert("Please enter a keyword to search");
    } else {
      axios
        .get("http://198.245.53.50:5000/api/search/" + this.state.search)
        .then(response => {
          console.log(response);
          this.setState({ dataSource: response.data });
          this.gotData();
        })
        .then(this.setState({ loading: false }))
        .then(() => console.log("DataSource", this.state.dataSource))
        .catch(function(error) {
          console.log("error", error);
        });
    } //alert(`Search ${this.state.search}`);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "70%",
          backgroundColor: "#CED0CE",
          marginLeft: "23%"
        }}
      />
    );
  };
  static navigationOptions = {
    header: null
  };
  render() {
    const { search, loading } = this.state;
    return (
      <View style={{backgroundColor: '#e4e4e4', flex: 1}}>
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
                  marginTop: 2
                }}
              >
                Search
              </Text>
            </View>
          </Left>
          <Right>
            <View style={{ height: 0, width: 550, backgroundColor: "grey" }} />
          </Right>
        </Header>
        <ScrollView>
          <View style={{ marginTop: 30 }}>
            <SearchBar
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
            />
          </View>
          {!this.state.gotData && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10
              }}
            >
              <Text style={{ color: "black", fontSize: 20, fontWeight: "700" }}>
                No News Found
              </Text>
            </View>
          )}
          <View style={{ marginBottom: 50 }}>
            {this.state.dataSource.length ? (
              <FlatList
                data={this.state.dataSource}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    color: "black",
    paddingTop: 20
  },
  catagoryStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "500",
    fontSize: 14,
    color: "grey",
    paddingTop: 10
  }
});
