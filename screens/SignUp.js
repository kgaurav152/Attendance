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

export default class SignUp extends Component {
  state = { email: "", password: "", role: "" };

  handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (Firebase.auth().currentUser) {
          userId = Firebase.auth().currentUser.uid;
          if (userId) {
            Firebase.database()
              .ref("users/" + userId)
              .set({
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
                uid: userId
              });
          }
        }
      })
      .catch(function(error) {
        console.log("Register !");
        console.log(error);
      });
  };
  render() {
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
        <View style={styles.fixTotext}>
          <TouchableHighlight>
            <Text style={styles.loginButton}>Have an account ?</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={(styles.loginButton, styles.loginText)}>
              Login Here
            </Text>
          </TouchableHighlight>
        </View>
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
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  registerButton: {
    backgroundColor: "#00b5ec",
    marginTop: 30
  },
  registerText: {
    color: "white"
  },

  loginButton: {
    marginLeft: 22,
    fontWeight: "900",
    color: "#D16713",
    fontSize: 17
  },
  loginText: {
    textAlign: "center",
    fontWeight: "900",
    color: "#D16713",
    fontSize: 17,
    marginLeft: 12
  }
});
