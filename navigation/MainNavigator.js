import React,{Component} from 'react';
import { createStackNavigator, createAppContainer,createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Button
} from "react-native";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";
import SideMenu from "../sidemenu";
import DeveloperScreen from '../screens/DeveloperScreen';

import ActionBarImage from "../components/ActionBarImage";

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require("../images/drawer.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "black"
    })
  }
});
const LoginScreen_StackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "black"
    })
  }
});
const DeveloperScreen_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Developers: {
    screen: DeveloperScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "black"
    })
  }
});
const Drawer = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: { screen: FirstActivity_StackNavigator },
    NavScreen2: { screen: LoginScreen_StackNavigator },
    NavScreen3: { screen: DeveloperScreen_StackNavigator }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 120
  }
);

const ScreenTabNavigator = createBottomTabNavigator({
  Home:Drawer,
  Screen:Screen2
});





const MainNavigator = createStackNavigator({

  Home:ScreenTabNavigator,
  Login:LoginScreen
  
});

export default createAppContainer(MainNavigator);
