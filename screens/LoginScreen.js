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
  Picker
} from "react-native";
import firebase from "../components/config";
import {Dropdown} from 'react-native-material-dropdown'
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
        .orderByChild("role")
        .equalTo(this.state.role)
        .once("value")
        .then(snapshot => {
        
        let userInfo = snapshot.val();
        let role = null;
        for( var attributes in userInfo){ 
          role = userInfo[attributes].role;
        }
        
        if (role == 'faculty'){
          this.props.navigation.navigate('WelcomeUser')
        }
        else if(role =='admin'){
          this.props.navigation.navigate('KEC_Katihar')
        }
        else{
          this.props.navigation.navigate('SignUp')
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
      <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Image
        style={styles.inputIcon}
        source={require("../assets/mailIcon.jpg")}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Role"
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        onChangeText={role => this.setState({ role })}
      />
    </View>

    
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
            source={require("../assets/mailIcon.jpg")}
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
        
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.handleLogin()}
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

  buttonContainerForgot: {
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 120,
    borderRadius: 15,
    marginLeft: "5%"
  },
  forgotButton: {
    backgroundColor: "#D16713"
  },
  forgotText: {
    fontWeight: "800"
  }
});
