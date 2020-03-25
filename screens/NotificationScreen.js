import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Firebase from "../components/config";
import { LinearGradient } from "expo-linear-gradient";
export default class NotificationScreen extends Component {
  state = { bodyText: "", titleText: "", token: [],loading:false };
  componentDidMount = () => {
    let token = [];
    Firebase.database()
      .ref("Token")
      .once("value")
      .then(snapshot => {
        let tokenInfo = snapshot.val();
        for (var attributes in tokenInfo) {
          token.push(tokenInfo[attributes].ExpoToken);
        }
      });
    this.setState({
      token: token
    });
  };
  sendPushNotification = () => {
      this.setState({
          loading:true
      })
    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        to: this.state.token,
        sound: "default",
        title: this.state.titleText,
        body: this.state.bodyText
      })
      
    });
    Alert.alert("Notification Send")
    this.setState({
        loading:false
    })
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
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
      
        <View style={styles.container}>
          {this.state.loading === false ? (
            <View>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/mailIcon.jpg")}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Title"
                  keyboardType="default"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onChangeText={titleText => this.setState({ titleText })}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/pwdIcon.png")}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="body"
                  keyboardType="default"
                  multiline={true}
                  underlineColorAndroid="transparent"
                  onChangeText={bodyText => this.setState({ bodyText })}
                />
              </View>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.sendPushNotification()}
              >
                <Text style={styles.loginText}>Send Notification</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <ActivityIndicator size="large" />
          )}
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
