import React, { Component } from "react";
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
  AsyncStorage
} from "react-native";
import firebase from "../components/config";
import AwesomeButton from "react-native-really-awesome-button";

import { LinearGradient } from "expo-linear-gradient";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      email: "",
      password: "",
      language: ""
    };
  }

  handleLogin = () => {
    try {
      const { role } = this.state;
      firebase
        .database()
        .ref("users")
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
            this.props.navigation.navigate("FacultyWelcome", {
              email: this.state.email
            });
          } else if (role == "admin") {
            this.props.navigation.navigate("AdminWelcome", {
              email: this.state.email
            });
          } else {
            const { name } = this.state;
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
                let image = null;

                for (var attributes in studentInfo) {
                  name = studentInfo[attributes].name;
                  reg_no = studentInfo[attributes].registration_num;
                  mobile = studentInfo[attributes].mobile;
                  department = studentInfo[attributes].department;
                  image = studentInfo[attributes].image;
                }

                this.props.navigation.navigate("StudentWelcome", {
                  email: this.state.email,
                  name,
                  reg_no,
                  department,
                  mobile,
                  image
                });
              });
          }
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };
  handlePass = () => {
    try {
      const { password } = this.state;
      firebase
        .database()
        .ref("users")
        .orderByChild("password")
        .equalTo(this.state.password)
        .once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            this.handleLogin();
          }
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  handleEmail = () => {
    try {
      const { email } = this.state;
      firebase
        .database()
        .ref("users")
        .orderByChild("email")
        .equalTo(this.state.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            this.handlePass();
          }
        });
    } catch (error) {
      console.log(error.toString(error));
    }
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
              keyboardType="password"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <AwesomeButton
            progress
            onPress={next => {
              this.handleEmail();
              next();
            }}
            backgroundColor="#9400d3"
          >
            Login
          </AwesomeButton>

          <TouchableHighlight
            style={[styles.buttonContainerForgot, styles.forgotButton]}
            onPress={() => this.forgotPassword()}
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
    marginTop:'4%',
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
