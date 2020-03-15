import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
function Separator() {
  return <View style={styles.separator} />;
}

export default class SearchStudentScreen extends Component {
    state = {reg_no : "", name:"",department:"",mobile:"",email:"",imageUrl:"",sem:""}
  searchStudent = () => {
      Firebase.database().ref("students").orderByChild("registration_num").equalTo(this.state.reg_no).once("value").then(snapshot =>{
          let studentInfo = snapshot.val();
          let name = null;
          let department = null;
          let mobile = null;
          let email = null;
          let reg_no = null;
          let imageUrl = null;
          let sem = null;
          for(attributes in studentInfo){
              name = studentInfo[attributes].name;
              department = studentInfo[attributes].department;
              mobile = studentInfo[attributes].mobile;
              email = studentInfo[attributes].email;
              reg_no= studentInfo[attributes].registration_num
              sem = studentInfo[attributes].semester
              imageUrl =studentInfo[attributes].image;
          }
          this.setState({
            name: name,
            department: department,
            mobile: mobile,
            email: email,
            reg_no: reg_no,
            imageUrl: imageUrl,
            sem : sem
          });
          this.props.navigation.navigate("StudentDetail", {
            email:this.state.email,
            name:this.state.name,
            department:this.state.department,
            mobile:this.state.mobile,
            reg_no:this.state.reg_no,
            imageUrl:this.state.imageUrl,
            sem:this.state.sem
          });
      }
        
        
        )
  }
  
    render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
               
        <View style={styles.fixToText}>
        <TextInput
                  style={styles.inputs}
                  placeholder="Reg No."
                  underlineColorAndroid="transparent"
                  onChangeText={reg_no => this.setState({ reg_no })}
        />
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.searchStudent()}
          >
            <Text style={styles.clickText}>Search</Text>
          </TouchableHighlight>
          
        </View>
        <Separator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
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
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  buttonContainer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15
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
    marginLeft: 15
  },
  headText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 14
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
