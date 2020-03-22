/*Example of Navigation Drawer with Sectioned Menu*/

import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions, createStackNavigator } from "react-navigation";
import Home from "./screens/HomeScreen";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Firebase from "./components/config";

class SideMenu extends Component {
  handleLogout = () => {
    Firebase.auth().signOut();

    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%"
          }}
          start={{ x: 0, y: 1}}
          end={{ x: 1, y: 1}}
        >
      <View style={styles.container}>
        <ScrollView>
          <TouchableHighlight
            style={[styles.buttonContainerHome]}
            
          >
            <Text style={styles.clickText}>Katihar Engineering College, Katihar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainerText]}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.clickText}>Home</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainerText]}
            onPress={() => this.props.navigation.navigate("Developers")}
          >
            <Text style={styles.clickText}>Developers Info</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainerText]}
            onPress={() => this.props.navigation.navigate("About")}
          >
            <Text style={styles.clickText}>About College</Text>
          </TouchableHighlight>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.logoutButton]}
            onPress={() => this.handleLogout()}
          >
            <Text style={styles.logoutText} >Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    width:"100%"
  },
  secondaryHeading: {
    padding: 10,
    fontWeight: "800",
    fontSize: 30,
    backgroundColor: "#fff"
  },
  mainHeading: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "lightgrey"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 10,
    width: 175,
    borderRadius: 30
  },
  logoutButton: {
    backgroundColor: "#00b5ec"
  },
  logoutText: {
    color: "white"
  },
  clickText: {
    color: "white",
    fontWeight: "900  ",
    fontSize:20
  },
  buttonContainerText: {
    height: 45,
    flexDirection: "row",
    width: 150,
    borderRadius: 20,
    marginTop: 2,
    marginLeft: "5%",
    
  },
  buttonContainerHome: {
    height: 85,
    flexDirection: "row",
    width: 250,
    marginTop:"15%",
    borderRadius:20 ,
    marginLeft: "5%",
    
  },
  footerContainer: {}
});

export default SideMenu;
