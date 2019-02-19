import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

class CategoriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      catagory: this.props.navigation.state.params.category,
      loading: true
    };
    //this.state={catagory} = this.props.catagory
  }
  static navigationOptions = {
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name="ios-search" color={tintColor}  size={30} />
    // )
    header: null
  };
  closeActivityIndicator = () => setTimeout(() => this.setState({
    loading: false
  }), 5000)
  componentWillMount() {
    this.closeActivityIndicator()
    axios
      .get(
        "http://198.245.53.50:5000/api/post-by-catagory/" + this.state.catagory
      )
      .then(response => this.setState({ dataSource: response.data }))
      //.then(this.setState({loading : false}));
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("NewsDetail", { data: item });
        }}
      >
        <ImageBackground
          source={{ uri: item.photoUrl }}
          imageStyle={{ borderRadius: 10 }}
          style={styles.imageThumbStyle}
        >
          <View style={styles.textViewStyle}>
            <Text style={styles.titleTextStyle}>{item.title.substring(0,30)+"..."}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // componentDidMount(){
  //   axios.get(`http://198.245.53.50:5000/api/post-by-catagory/${catagory}`)
  //   .then(response=>{console.log(response);this.setState({ dataSource:response.data })})
  //   .then(()=>console.log('DataSource', this.state.dataSource))
  //   .catch(function(error){
  //     console.log('error', error)
  //   })
  // }

  renderList() {
    this.setState()
    if (this.state.loading) {
      return <ActivityIndicator size="large"animating={this.state.loading} />;
    } else {
      return (
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
        />
      );
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 26,
            margin: 10,
            color: "black",
            fontWeight: "700"
          }}
        >
          {this.state.catagory}
        </Text>
        {this.state.loading && (<ActivityIndicator size='large' animating={this.state.loading}/>)}
        {/* {this.renderList()} */}
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
        />
        
      </View>
    );
  }
}

// const YesterdayPosts = ({ posts }) => {
//   //const { title, photoUrl, description } = posts;

//   renderItem = ({ posts }) => {
//     const { title, photoUrl } = posts;
//     return (
//       <ImageBackground
//         source={{ uri: photoUrl }}
//         imageStyle={{ borderRadius: 10 }}
//         style={styles.imageThumbStyle}
//       >
//         <View style={styles.textViewStyle}>
//           <Text style={styles.titleTextStyle}>{title}</Text>
//         </View>
//       </ImageBackground>
//     );
//   };
//   return (
//     <View>
//       <FlatList data={posts} renderItem={this.renderItem} />
//     </View>
//   );
// };

export default CategoriesView;

const styles = StyleSheet.create({
  imageThumbStyle: {
    height: 250,
    width: 150,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 2,
    marginRight: 10
  },
  titleTextStyle: {
    backgroundColor: "transparent",
    fontFamily: "Arial",
    fontWeight: "bold",
    color: "white",
    padding: 8,
    fontSize: 18,
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 170,
    fontSize: 25,
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
