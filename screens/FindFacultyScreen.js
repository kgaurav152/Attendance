import React, { Component } from "react";
import Firebase from '../components/config'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  AsyncStorage
} from "react-native";
import moment from "moment";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Left } from "native-base";
function Separator() {
  return <View style={styles.separator} />;
}

export default class FindFacultyScreen extends Component {
    state ={email:""}
  componentDidMount() {

    
  }

  
  render() {

   
    
    

    return (

      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
        <View>
              <View style={styles.inputContainer}>
                
                <TextInput
                caretHidden
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onChangeText={email => this.setState({ email })}
                />
              </View>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.props.navigation.navigate("AddLeaveToFaculty",{email:this.state.email})}
              >
                <Text style={styles.loginText}>Find Faculty</Text>
            </TouchableHighlight>
             </View> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1
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
  grid: {
    flex: 1,
    backgroundColor: '#E8E8E8'
  },

  gridRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  dynamicContent: {
    marginLeft: 20,
    flexDirection:"column",
    justifyContent:"flex-end"
  },
  gridItemText: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: "900",
    borderRadius: 30,
    padding: 5

  },
  approveButtonStyle: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  rejectButtonStyle: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  fixImage: {
    justifyContent: "flex-start",
    flexDirection: "row",
  
  },
  paragraph: {
    margin: 1.5,
    marginLeft:5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  paragraph1: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
    marginRight: "2%"
  },
  desk: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "600",
    color: "#dc143c",
    marginBottom:10
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
  },

  clickButton: {
    backgroundColor: "#09C5F7"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
    marginLeft: 15,

  },
  fixDate: {
    flexDirection: "row",
    justifyContent: "space-between",

    textAlign: "center",
    marginLeft: 15
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
  approveButton: {
    backgroundColor: "green",
    
    
  },
  rejectButton: {
    backgroundColor: "red",
    
  },
  loginText: {
    color: "white"
  },
  headText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 14
  },
  
});
