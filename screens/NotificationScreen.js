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
  KeyboardAvoidingView
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Firebase from "../components/config";
import { LinearGradient } from "expo-linear-gradient";
import AwesomeAlert from "react-native-awesome-alerts";
import {Card} from 'react-native-elements'

export default class NotificationScreen extends Component {
  state = { bodyText: "", titleText: "", token: [], loading: false, notification: [], delete:'' };
  
    _handleNotification=(notification)=>{
  const a =notification.data;
  Object.keys(a).forEach((key) => {
    console.log(key, a[key]);
    this.setState({
      notification:a[key],
      delete:'Delete'
    })
});
      
    }
  componentDidMount = () => {
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

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
  deleteNotification=()=>{
    this.setState({
      notification:'',
      delete:''
    })
  }
  checkCondition = () => {
    if (
      this.state.bodyText == "" ||
      this.state.bodyText == undefined ||
      this.state.bodyText == null
    ) {
      this.messageAlert();
    } else if (
      this.state.titleText == "" ||
      this.state.titleText == undefined ||
      this.state.titleText == null
    ) {
      this.titleAlert();
    } else {
      this.sendPushNotification();
    }
  };
  sendPushNotification = () => {
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
        body: this.state.bodyText,
        data: { message: [this.state.bodyText] },
      })
    });
//{JSON.stringify(this.state.notification).replace(/[\[\]"]+/g,"")}
    this.sendNotificationAlert();
  };
  sendNotificationAlert = () => {
    this.setState({
      sendNotificationAlert: true
    });
  };
  titleAlert = () => {
    this.setState({
      titleAlert: true
    });
  };
  messageAlert = () => {
    this.setState({
      messageAlert: true
    });
  };
  hideAlert = () => {
    this.textInput.clear();
    this.textTitleInput.clear();
    this.setState({
      sendNotificationAlert: false,
      titleAlert: false,
      messageAlert: false,
      bodyText: "",
      titleText: ""
    });
  };
  render() {
    const { sendNotificationAlert, messageAlert, titleAlert } = this.state;
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
          {this.state.delete==='Delete'?(
         <View>
          <Card
          style={styles.card}
          >
          <Text style ={styles.paragraph}>{JSON.stringify(this.state.notification).replace(/[\[\]"]+/g,"")} </Text>
          </Card>
          </View>
          ):null}
          {this.state.delete ==='Delete'?(
          <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.deleteNotification()}
            >
              <Text style={styles.loginText}>{this.state.delete}</Text>
            </TouchableHighlight>
          ):null}
      

          
            <View style={styles.inputContainer}>

              <TextInput
                ref={input => {
                  this.textTitleInput = input;
                }}
                style={styles.inputs}
                placeholder="Title"
                keyboardType="default"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={titleText => this.setState({ titleText })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                ref={input => {
                  this.textInput = input;
                }}
                style={styles.inputs}
                placeholder="Message"
                keyboardType="default"
                multiline={true}
                underlineColorAndroid="transparent"
                onChangeText={bodyText => this.setState({ bodyText })}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.checkCondition()}
            >
              <Text style={styles.loginText}>Send Notification</Text>
            </TouchableHighlight>
            
            
            
          </View>
          <AwesomeAlert
            show={sendNotificationAlert}
            showProgress={false}
            title="Notification Send"
            message="!"
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
            show={messageAlert}
            showProgress={false}
            title="Oops !"
            message="Message Can't be Empty"
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
            show={titleAlert}
            showProgress={false}
            title="Oops !"
            message="Title Can't be Empty"
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
    
    marginTop:20,
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
    marginTop:20,
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
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  card:{
    marginBottom:20
  }
});
