import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import axios from 'axios'
import Icon from "react-native-vector-icons/Ionicons";

class CategoriesView extends Component{
  constructor(props){
    super(props)
    this.state={dataSource:[],
    catagory: this.props.navigation.state.params.category}
    //this.state={catagory} = this.props.catagory
  }


  componentWillMount(){
    axios.get('http://198.245.53.50:5000/api/post-by-catagory/'+this.state.catagory)
    .then(response => this.setState({dataSource: response.data}))
  }

  renderItem=({item})=>{
    return (
            <ImageBackground
              source={{ uri: item.photoUrl }}
              imageStyle={{ borderRadius: 10 }}
              style={styles.imageThumbStyle}
            >
              <View style={styles.textViewStyle}>
                <Text style={styles.titleTextStyle}>{item.title}</Text>
              </View>
            </ImageBackground>
          );
  }

  // componentDidMount(){
  //   axios.get(`http://198.245.53.50:5000/api/post-by-catagory/${catagory}`)
  //   .then(response=>{console.log(response);this.setState({ dataSource:response.data })})
  //   .then(()=>console.log('DataSource', this.state.dataSource))
  //   .catch(function(error){
  //     console.log('error', error)
  //   })
  // }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{fontSize: 20, margin: 10, color: 'black', fontWeight: '700'}}>{this.state.catagory}</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
        />
      </View>
    )
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
    color: "white"
  },
  textViewStyle: {
    justifyContent: "center",
    paddingTop: 200,
    fontSize: 25,
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
