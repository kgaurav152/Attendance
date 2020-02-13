import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableHighlight,
  Picker,
  Alert
} from "react-native";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";


export default class SignUp extends Component {
  state = { email: "", password: "", role: "", error: "", showAlert: false };
  emailUsed = () => {
    this.setState({
      emailUsed: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      emailUsed: false,
      email: "",
      password: "",
      role: ""
    });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    })
  };

  handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (Firebase.auth().currentUser) {
          userId = Firebase.auth().currentUser.uid;
          role = this.state.role;
          if (userId) {
            Firebase.database()
              .ref("users/" + userId)
              .set({
                email: this.state.email,
                
                role: this.state.role,
                uid: userId
              });
          }
          if (role == "faculty") {
            Firebase.database()
              .ref("Faculty/")
              .push({
                email: this.state.email
              })
              .child("Subject");
          } else if (role == "student") {
            Firebase.database()
              .ref("students/")
              .push({
                email: this.state.email
              });
          } else {
            Firebase.database()
              .ref("admins/")
              .push({
                email: this.state.email
              });
          }
          this.showAlert();
        }
      })
      .catch(error => {
        this.setState({
          error: error.code
        });
        if (this.state.error === "auth/email-already-in-use") {
          this.emailUsed();
        } else {
        }
      });
  };
  render() {
    const { showAlert, emailUsed } = this.state;

    return (
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
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
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
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <Picker
          selectedValue={this.state.role}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ role: itemValue })
          }
        >
          <Picker.Item label="Select Role" value="Role" />
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Faculty" value="faculty" />
          <Picker.Item label="Student" value="student" />
        </Picker>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.registerButton]}
          onPress={() => this.handleSignUp()}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainerLogin, styles.loginButton]}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Have an Account ? Login Here</Text>
        </TouchableHighlight>

        <AwesomeAlert
          show={emailUsed}
          showProgress={false}
          title="SignUp alert"
          message="Email already in use"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          //cancelText="No, cancel"
          confirmText="OK !"
          contentContainerStyle={{
            backgroundColor: "white"
          }}
          confirmButtonColor="#10356c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="SignUp alert"
          message="User Registration Successful"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          //cancelText="No, cancel"
          confirmText="OK !"
          contentContainerStyle={{
            backgroundColor: "white"
          }}
          confirmButtonColor="#10356c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
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
  fixTotext: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "#87ceeb",
    fontWeight: "800"
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
    width: 250,
    borderRadius: 30
  },
  registerButton: {
    backgroundColor: "#10356c",
    marginTop: 30
  },
  registerText: {
    color: "white"
  },
  buttonContainerLogin: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#10356c",
    marginTop: 30
  },
  loginText: {
    color: "white"
  }
});
