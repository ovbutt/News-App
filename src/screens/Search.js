import React, { Component } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default class Search extends Component {
  // constructor() {
  //   super();
  //   this.state = {

  //   };
  // }
  //state = {  };
  state = {
    dataSource: [],
    search: "",
    loading: false,
    //dataSource: [],
    names: [
      {
        id: 0,
        name: "Business"
      },
      {
        id: 1,
        name: "World"
      },
      {
        id: 2,
        name: "Fashion"
      },
      {
        id: 3,
        name: "Politics"
      },
      {
        id: 4,
        name: "Sports"
      },
      {
        id: 5,
        name: "Health"
      },
      {
        id: 6,
        name: "Science"
      }
    ]
  };
  alertItemName = item => {
    alert(item.name);
    this.setState({ loading: true });
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" color={tintColor} size={30} />
    )
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", width: 400 }}>
        <Image
          imageStyle={{ borderRadius: 10 }}
          source={{ uri: item.photoUrl }}
          style={styles.imageThumbStyle}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.catagoryStyle}>{item.catagory}</Text>

          <Text style={styles.titleTextStyle}>
            {item.title.substring(0, 37) + "..."}
          </Text>
        </View>
      </View>
    );
  };

  searchIt() {
    this.setState({ loading: true });
    axios
      .get("http://198.245.53.50:5000/api/posts")
      .then(response => {
        console.log(response);
        this.setState({ dataSource: response.data });
      })
      .then(this.setState({ loading: false }))
      .then(() => console.log("DataSource", this.state.dataSource))
      .catch(function(error) {
        console.log("error", error);
      });
    //alert(`Search ${this.state.search}`);
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

  render() {
    //const {}
    const { search, loading } = this.state;
    return (
      <View>
        <View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "black",
                marginLeft: 10,
                marginTop: 30
              }}
            >
              Search
            </Text>
          </View>
          <SearchBar
            showLoading={loading}
            platform="ios"
            // cancelButtonTitle="Cancel"
            placeholder="Search"
            cancelButtonProps={{ color: "#bfbfbf" }}
            onChangeText={search => this.setState({ search })}
            value={search}
            onSubmitEditing={() => {
              this.searchIt();
            }}
          />
        </View>
        <FlatList
          data={this.state.dataSource.filter(dataSource=>dataSource.title == 'He who fears he will suffer, already suffers because he fears')}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "black",
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Popular Categories
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {this.state.names.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.container}
              //onPress={() => this.setState({ search: item.name })}
            >
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#bfbfbf",
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
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 200,
    fontSize: 25,
    alignItems: "center"
  }
});
