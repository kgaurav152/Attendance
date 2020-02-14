import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Picker,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
import { LinearGradient } from "expo-linear-gradient";

export default class LoginScreen extends Component {
  state = { date: "", email: "", password: "", language: "", errorMessage: "" };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        var user = firebase.auth().currentUser;
        var uid;

        if (user != null) {
          uid = user.uid;
        }

        if (uid) {
          firebase
            .database()
            .ref("users/")
            .orderByChild("email")
            .equalTo(this.state.email)
            .once("value")
            .then(snapshot => {
              let userInfo = snapshot.val();
              let role = null;
              for (var attributes in userInfo) {
                role = userInfo[attributes].role;
              }
              if (role == "faculty") {
                firebase
                  .database()
                  .ref("Faculty")
                  .orderByChild("email")
                  .equalTo(this.state.email)
                  .once("value")
                  .then(snapshot => {
                    let facultyInfo = snapshot.val();
                    let name = null;
                    let department = null;
                    let mobile = null;
                    for (var attributes in facultyInfo) {
                      name = facultyInfo[attributes].name;
                      department = facultyInfo[attributes].department;
                      mobile = facultyInfo[attributes].mobile;
                      imageUrl = facultyInfo[attributes].image;
                    }
                    this.setState({
                      name: name,
                      department: department,
                      mobile: mobile,
                      imageUrl: imageUrl
                    });

                    this.props.navigation.navigate("FacultyWelcome", {
                      email: this.state.email,
                      name,
                      department,
                      mobile,
                      imageUrl
                    });
                  });
              } else if (role == "admin") {
                this.props.navigation.navigate("AdminWelcome", {
                  email: this.state.email
                });
              } else {
                firebase
                  .database()
                  .ref("students")
                  .orderByChild("email")
                  .equalTo(this.state.email)
                  .once("value")
                  .then(snapshot => {
                    let studentInfo = snapshot.val();
                    let name = null;
                    let reg_no = null;
                    let mobile = null;
                    let department = null;
                    let imageUrl = null;
                    let sem = null;
                    for (var attributes in studentInfo) {
                      name = studentInfo[attributes].name;
                      reg_no = studentInfo[attributes].registration_num;
                      mobile = studentInfo[attributes].mobile;
                      department = studentInfo[attributes].department;
                      imageUrl = studentInfo[attributes].image;
                      sem = studentInfo[attributes].semester;
                    }

                    this.props.navigation.navigate("StudentWelcome", {
                      email: this.state.email,
                      name,
                      reg_no,
                      department,
                      mobile,
                      imageUrl,
                      sem
                    });
                  });
              }
            });
        }
      })
      .catch(function(error) {
        errorCode = error.code;
        errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          alert("Password Wrong.");
        } else if (errorCode === "auth/user-not-found") {
          alert("You are not registered with us ! Please Check your Email");
        } else {
        }
      });
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
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/mailIcon.jpg")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              autoFocus
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/pwdIcon.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              keyboardType="default"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.handleLogin()}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainerForgot, styles.forgotButton]}
            onPress={() =>
              this.props.navigation.navigate("ForgotPasswordScreen")
            }
          >
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableHighlight>
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
    marginLeft: "4%"
  },
  forgotButton: {
    backgroundColor: "#D16713"
  },
  forgotText: {
    fontWeight: "800"
  }
});
