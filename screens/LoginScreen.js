import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import firebase from '../components/config'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      email: "",
      password: ""
    };
  }

  handleLogin = () => {
    try {
      const { email, password } = this.state
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(() => this.props.navigation.navigate('WelcomeUser'));
} catch (error) {
      console.log(error.toString(error));
    }
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
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('WelcomeUser')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={[styles.buttonContainerForgot, styles.forgotButton]}
          onPress={() => this.forgotPassword()}
        >
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableHighlight>
        
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
  
  buttonContainerForgot:{
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 120,
    borderRadius: 15,
    marginLeft:'5%'
  },
  forgotButton: {
    backgroundColor: "#D16713"
  },
  forgotText:{
    fontWeight:'800'
  } 
});