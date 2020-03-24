import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  NetInfo
} from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
import { LinearGradient } from "expo-linear-gradient";

export default class FeedbackScreen extends Component {
  state = {  email: "", name: "", feedback: ""};
  addFeedback=()=>{
    Firebase.database()
    .ref("Feedback/")
    .push({
      email: this.state.email,
      
      name: this.state.name,
      feedback: this.state.feedback
    });
    this.props.navigation.navigate("AboutApp")
}
  
  

 
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
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          
            <View>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/mailIcon.jpg")}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onChangeText={email => this.setState({ email })}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                 
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Name"
                  keyboardType="default"
                  
                  underlineColorAndroid="transparent"
                  onChangeText={name => this.setState({ name })}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Feedback"
                  keyboardType="default"
                  
                  underlineColorAndroid="transparent"
                  onChangeText={feedback => this.setState({ feedback })}
                />
              </View>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.addFeedback()}
              >
                <Text style={styles.feedbackText}>Add Feedback</Text>
              </TouchableHighlight>
              

       
            </View>
            
          
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  fixTotext: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  forgotButton: {
    marginRight: 40,
    fontWeight: "900",
    color: "#00ffff",
    fontSize: 17
  },
  buttonContainerForgot: {
    marginTop: "4%",
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "40%",
    borderRadius: 15,
    marginLeft: "20%"
  },
  forgotButton: {
    backgroundColor: "#D16713"
  },
  forgotText: {
    fontWeight: "800"
  }
});
