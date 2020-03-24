import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Alert,TouchableHighlight,ScrollView} from "react-native";
import Constants from "expo-constants";

import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
function Separator() {
  return <View style={styles.separator} />;
}

export default class Homescreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
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
        <View style={styles.Home}>
        <View style={styles.fixToText}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.clickText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("KEC_Katihar")}
          >
            <Text style={styles.clickText}>KEC Katihar</Text>
          </TouchableHighlight>
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("Developers")}
          >
            <Text style={styles.clickText}>Developers</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("AboutApp")}
          >
            <Text style={styles.clickText}>About</Text>
          </TouchableHighlight>
        </View>
        <Separator />
        
        </View>
        <Text style={styles.footer}>{"\u00A9"} 2020 KEC Katihar</Text>

        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:"center",
    alignContent: 'center',
  },
  footer: {
    fontWeight: "900",
    fontSize: 22,
    color: "#7b68ee",
    textAlign: "center",
    marginTop: 40
  },
  Home:{
    justifyContent:'center',
    alignContent:"center",
    marginTop:"30%"
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
  },
  buttonContainer: {
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 15,
    marginLeft:"5%"
  },
  clickButton: {
    backgroundColor: "#09C5F7"
  },
  clickText: {
    color: "white",
    fontSize:20,
    fontWeight: "800"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
    marginLeft: 15
  },
});