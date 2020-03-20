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
import firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
import { LinearGradient } from "expo-linear-gradient";

export default class LoginScreen extends Component {
  state = { date: "", email: "", password: "", language: "", errorMessage: "" };
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  componentDidMount = () => {
    this.setState({
      loading: false
    });
    
  };
  wrongEmail = () => {
    Alert.alert("Wrong Email !");
  };
  wrongPass = () => {
    Alert.alert("Wrong password");
  };

  goToStudentsDetails = () => {
    
    let name = "",  department = "",  mobile = "" ,sem="", reg_no="";
    NetInfo.isConnected.fetch().done((isConnected) => {
      if(isConnected){
        let promise = firebase
      .database()
      .ref("students")
      .orderByChild("email")
      .equalTo(this.state.email)
      .once("value");
    promise
      .then(snapshot => {
        let studentInfo = snapshot.val();
        for (var attributes in studentInfo) {
          name = studentInfo[attributes].name;
          department = studentInfo[attributes].department;
          mobile = studentInfo[attributes].mobile;
          imageUrl = studentInfo[attributes].image;
          sem= studentInfo[attributes].sem,
          reg_no= studentInfo[attributes].registration_num
        }
        this.setState({
          name: name,
          department: department,
          mobile: mobile,
          imageUrl: imageUrl,
          sem:sem,
          reg_no:reg_no,
          loading: false
        });

        AsyncStorage.setItem(
          this.state.email + "details",
          JSON.stringify(studentInfo)
        );
        this.props.navigation.navigate("StudentWelcome", {
          email: this.state.email,
          name,
          department,
          mobile,
          sem,
          reg_no,
          imageUrl
        });
      })
      .catch(error => {
          console.log( error );
      });
      }
      else{
        AsyncStorage.getItem(this.state.email + "details").then(val => {
          let studentInfo = JSON.parse(val);
          for (var attributes in studentInfo) {
            name = studentInfo[attributes].name;
            department = studentInfo[attributes].department;
            mobile = studentInfo[attributes].mobile;
            imageUrl = studentInfo[attributes].image;
            sem=studentInfo[attributes].sem;
            reg_no=studentInfo[attributes].registration_num;

          }
          this.setState({
            name: name,
            department: department,
            mobile: mobile,
            sem:sem,
            reg_no:reg_no,
            imageUrl: imageUrl,
            loading: false
          });

          this.props.navigation.navigate("StudentWelcome", {
            email: this.state.email,
            name,
            department,
            mobile,
            sem,
            reg_no,
            imageUrl
          });
        });
      }
    });
    
    
  };

  gotToFacultyDetails = () => {
    
    let name = "",  department = "",  mobile = "";
    NetInfo.isConnected.fetch().done((isConnected) => {
      if(isConnected){
        let promise = firebase
      .database()
      .ref("Faculty")
      .orderByChild("email")
      .equalTo(this.state.email)
      .once("value");
    promise
      .then(snapshot => {
        let facultyInfo = snapshot.val();
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
          imageUrl: imageUrl,
          loading: false
        });

        AsyncStorage.setItem(
          this.state.email + "details",
          JSON.stringify(facultyInfo)
        );
        this.props.navigation.navigate("FacultyWelcome", {
          email: this.state.email,
          name,
          department,
          mobile,
          imageUrl
        });
      })
      .catch(error => {
          console.log( error );
      });

      }
      else{
        AsyncStorage.getItem(this.state.email + "details").then(val => {
          let facultyInfo = JSON.parse(val);
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
            imageUrl: imageUrl,
            loading: false
          });

          this.props.navigation.navigate("FacultyWelcome", {
            email: this.state.email,
            name,
            department,
            mobile,
            imageUrl
          });
        });
      }
    });
    
    
  };

  redirectToLandingPage = (role) => {
    if (role == "faculty") {
      this.gotToFacultyDetails();
      this.setState({ loading: false });
    } else if (role == "admin") {
      this.props.navigation.navigate("AdminWelcome", {
        email: this.state.email
      });
      this.setState({ loading: false });
    } else {
      this.goToStudentsDetails();
    }
  };
  handleOfflineLogin = (userInfo) => {
    let role = null;
    for (var attributes in userInfo) {
      role = userInfo[attributes].role;
    }
    this.redirectToLandingPage(role);
  };

  fetchUserFromAsncStorage = (userInfo) => {
    this.setState({
      loading: true
    });
    if (userInfo != null && userInfo != undefined && userInfo != "") {
      let jsonUserInfo = JSON.parse(userInfo);
      this.handleOfflineLogin(jsonUserInfo);
    }

  };
  handleOnlineLogin = () => {
    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

      .then(() => {
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

            AsyncStorage.setItem(
              this.state.email,
              JSON.stringify(userInfo)
            ).then(val => {
              console.log(
                "Following information persisted for user " +
                  this.state.email +
                  "" +
                  JSON.stringify(userInfo)
              );
            });
            this.redirectToLandingPage(role);
          });
      })
      .catch(error => {
        this.setState({
          error: error.code
        });
        if (this.state.error === "auth/wrong-password") {
          this.wrongPass();
        } else if (this.state.error === "auth/user-not-found") {
          this.wrongEmail();
        } 
        
        this.setState({
          loading: false
        });
      });
  };
  handleLogin=()=>{
    NetInfo.isConnected.fetch().done((isConnected) => {
      if ( isConnected )
      {
         this.handleOnlineLogin();
      }
      else
      {
        AsyncStorage.getItem(this.state.email).then( userInfo => {
          this.fetchUserFromAsncStorage( userInfo );
        })
      }
  })
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
          {this.state.loading === false ? (
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
