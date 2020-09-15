import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Image,
  TouchableHighlight
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
function Separator() {
  return <View style={styles.separator} />;
}
export default class SubjectScreen extends Component {
  
  render() {
   
    return (
      <View style={styles.container}>
      <View style={styles.fixToText}>
      <LinearGradient
        colors={["#a13388", "#10356c"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer]}
      >
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("AddSubject")
          }
        >
          <Text style={styles.clickText}>Add Subject</Text>
        </TouchableHighlight>
      </LinearGradient>
      <LinearGradient
        colors={["#a13388", "#10356c"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer]}
      >
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("AssignSubject")
          }
        >
          <Text style={styles.clickText}>Assign Subject</Text>
        </TouchableHighlight>
      </LinearGradient>
      </View>
      <Separator/>
      <View style={styles.fixToText}>
      <LinearGradient
        colors={["#a13388", "#10356c"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer]}
      >
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("RemoveSubject")
          }
        >
          <Text style={styles.clickText}>Remove Subject</Text>
        </TouchableHighlight>
      </LinearGradient>
      
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    fixImage: {
      justifyContent: "space-around",
      flexDirection: "row",
    },
    paragraph: {
      margin: 1.5,
      fontSize: 14,
      fontWeight: "700",
      paddingLeft: 12,
      color: "#008b8b",
    },
    welcomeUser: {
      textAlign: "center",
      fontSize: 18,
      paddingTop: 30,
      fontWeight: "600",
      color: "#09C5F7",
    },
    buttonContainer: {
      height: 65,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      width: 150,
      borderRadius: 20,
      marginTop: 20,
      marginRight: 15,
    },
    buttonContainer1: {
      height: 65,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      width: 150,
      borderRadius: 20,
      marginTop: 20,
      marginLeft: "4%",
    },
    clickButton: {
      backgroundColor: "#09C5F7",
    },
    clickText: {
      color: "white",
      fontWeight: "800",
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 100,
      width: 300,
      textAlign: "center",
      marginLeft: 15,
    },
    headText: {
      fontWeight: "900",
      color: "#f4a460",
      fontSize: 18,
      marginTop: 20,
      marginLeft: 14,
    },
    separator: {
      marginVertical: "3%",
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    paragraphName: {
      margin: 1.5,
      fontSize: 14,
      fontWeight: "700",
      paddingLeft: 12,
      color: "#008b8b",
      marginLeft: "2%",
    },
  });
  