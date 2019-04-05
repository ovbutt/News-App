import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Cat from "./src/screens/Cat";
import CategoriesView from "./src/components/CategoriesView";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import Today from "./src/screens/Today";
import Discover from "./src/screens/Discover";
import Search from "./src/screens/Search";
import Pages from "./src/screens/Pages";
import NewsDetail from "./src/components//NewsDetail";
import PostForm from "./src/components/PostForm";
import EditPostForm from "./src/components/EditPostForm";
import SearchResult from "./src/components/SearchResult";
import LiveVideos from "./src/screens/LiveVideos";
import Camera from "./src/components/Camera";
import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import LiveVideoDetail from "./src/components/LiveVideoDetail";
import Comments from "./src/components/Comments";
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const TodayNavigator = createStackNavigator(
  {
    Today: Discover,
    SearchResult: SearchResult,
    NewsDetail: NewsDetail,
    Comments: Comments
  },
  {
    defaultNavigationOptions: {
      //header: null
    }
  }
);
TodayNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const CategoryNavigator = createStackNavigator(
  {
    Categories: Cat,
    CategoriesView: CategoriesView,
    NewsDetail: NewsDetail,
    Comments: Comments
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
const SearchNavigator = createStackNavigator(
  {
    Search: Search,
    SearchResult: SearchResult,
    CategoriesView: CategoriesView,
    NewsDetail: NewsDetail,
    Comments: Comments
  },
  {
    defaultNavigationOptions: {
      //header: null
    }
  }
);
SearchNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const LiveVideosStack = createStackNavigator(
  {
    LiveVideos: LiveVideos,
    Camera: Camera,
    LiveVideoDetail: LiveVideoDetail
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
LiveVideosStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const GoLiveNavigator = createStackNavigator({
  GoLive: Today,
  EditPostForm: EditPostForm,
  PostForm: PostForm,
  NewsDetail: NewsDetail,
  Comments: Comments
});
GoLiveNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const ProfileNavigator = createStackNavigator({
  Profile: Pages,
  //  CategoriesView : CategoriesView,
  EditPostForm: EditPostForm,
  PostForm: PostForm,
  NewsDetail: NewsDetail,
  Comments: Comments
});
ProfileNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const AppTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: TodayNavigator
    },
    LiveVideos: {
      screen: LiveVideosStack
    },
    // MyPosts: {
    //   screen: GoLiveNavigator
    // },
    Search: {
      screen: SearchNavigator
    },
    Profile: {
      screen: ProfileNavigator
    }
  },
  {
    lazy: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#f54b64",
      inactiveTintColor: "#d1cece",
      showLabel: true,
      showIcon: true,
      style: { backgroundColor: "#242a38" }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Explore") {
          iconName = "ios-star";
        } else if (routeName === "Categories") {
          iconName = "ios-apps";
        } else if (routeName === "Search") {
          iconName = "ios-search";
        } else if (routeName === "MyPosts") {
          iconName = "ios-add-circle";
        } else if (routeName === "Profile") {
          iconName = "ios-contact";
        } else if (routeName === "LiveVideos") {
          return <IconFA name="tv" size={25} color={tintColor} />;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);
const AppStack = createStackNavigator(
  { First: AppTabNavigator },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  Profile: Pages
});

const AuthSwitchNavigator = createSwitchNavigator(
  {
    AuthLoadingScreen: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoadingScreen"
  }
);

const AppContainer = createAppContainer(AuthSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
