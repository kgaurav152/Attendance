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

export default class AssignSubject extends Component{
    state = { email: "", subject: ""};
    assignSubject = () =>{
     let id;   
      Firebase.database().ref("Faculty/").orderByChild("email")
        .equalTo(this.state.email)
        .on("value",function(snapshot){
            const data = snapshot.val()
            if(data){
              id = Object.keys(data)[0]
            }
          })
            if( Firebase.database().ref("Faculty/").orderByChild("email")
            .equalTo(this.state.email)
            .once("value")){
                Firebase.database()
                .ref("Faculty/"+id+"/Subject/")
                .update({
                subjectName: this.state.subjectName,
                subjectSem: this.state.subjectSem,
                    }).catch(function(error) {
                      console.log("Wrong Choice");
                      console.log(error);
                    });

                  }
        }   

    render(){
        return(
            <View style={styles.container}>
        <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <Picker
          selectedValue={this.state.subjectName}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ subjectName: itemValue })
          }
        >
          <Picker.Item label="Select Subject" value="Subject" />
          <Picker.Item label="DBMS" value="DBMS" />
          <Picker.Item label="OS" value="OS" />
          <Picker.Item label="DAA" value="DAA" />
        </Picker>
        <Picker
          selectedValue={this.state.subjectSem}
          style={{ height: 50, width: 180 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ subjectSem: itemValue })
          }
        >
          <Picker.Item label="Select Sem" value="Sem" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
        </Picker>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.registerButton]}
          onPress={() => this.assignSubject()}
        >
          <Text style={styles.registerText}>Assign</Text>
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
  