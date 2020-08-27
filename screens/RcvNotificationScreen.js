import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  Image,
  
} from "react-native";

import { FlatList } from "react-native-gesture-handler";


export default class RcvNotificationScreen extends Component {
  state = { notification: [], notify: "" };
  getNotificationFromAsyncStorage = async () => {
    AsyncStorage.getItem("notificationList").then(list => {
      let notification = JSON.parse(list);
      
      if(notification.length==0)
      {
          
      }
      else{
        let a = notification;
    
    this.setState({
      notification:a,
      notify:"Notify"
    })
    

          
      }
      
    });
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getNotificationFromAsyncStorage();
      
    });
  };
  deleteNotification = async item => {
    var value = item;
    var notificationObj = this.state.notification;
    notificationObj = notificationObj.filter(item => item !== value);
    this.setState({
      notification: notificationObj
    });
    if(notificationObj.length==0){
          this.setState({
              notify:''
          })
    }
    AsyncStorage.removeItem("notificationList").then(
      AsyncStorage.setItem("notificationList", JSON.stringify(notificationObj))
     
    );
  };
  renderNotification = item => {
    return (
      <View>
        <View >
          <TouchableHighlight>
            <Text style={styles.clickText}>{item}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.deleteNotification(item)}>
            <Image
              style={styles.inputIcon}
              source={require("../images/del.png")}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
      {this.state.notify==='Notify' ?(
        <View>
        <Text style={styles.welcomeUser}>
          Notifications
        </Text>
        <FlatList
          data={this.state.notification}
          windowSize={5}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          renderItem={({ item }) => this.renderNotification(item)}
        />
        </View>
      ):<Text style={styles.paragraph}>No Notification </Text>}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  footer: {
    fontWeight: "900",
    fontSize: 22,
    color: "#7b68ee",
    textAlign: "center",
    marginTop: 40
  },
  Home: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: "30%"
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    width: "70%",
    borderRadius: 25
  },
  clickButton: {
    backgroundColor: "#09C5F7"
  },
  clickText: {
    color: "#008b8b",
    fontSize: 16,
    
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    width: 300,
    textAlign: "center"
  },
  buttonContainerDel: {
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: 150,
    borderRadius: 30
  },
  delButton: {
    backgroundColor: "red",
    marginRight: "10%"
  },
  delText: {
    color: "#008b8b",
    fontSize: 14
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: "45%",
    justifyContent: "center"
  },
  card: {
    height: "25%",
    borderRadius: 50
  },
  paragraphNotify: {
    margin: 1.5,
    fontSize: 14,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
    paddingLeft: 12,
    color: "red"
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "600",
    color: "#09C5F7",
    marginBottom:'5%'
  },
});
