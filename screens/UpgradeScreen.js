import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Image,
  FlatList,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";

export default class AddStudent extends Component {
  constructor(props) {
    super();
    this.state = {
      currentSem: "",

      department: "",
      studentRegNoList: [],
    };
  }
  updateDepartment = (department) => {
    this.setState({ department: department });
  };
  showStudents = () => {
    var studentRegNoList = [];
    Firebase.database()
      .ref("students")
      .once("value")
      .then((snapshot) => {
        var studentsInfo = snapshot.val();
        
        var db_sem = "";
        var db_department = "";
        for (var attributes in studentsInfo) {
          db_department = studentsInfo[attributes].department;

          db_sem = studentsInfo[attributes].semester;
          if (db_department === this.state.department) {
            if (db_sem === this.state.currentSem) {
              var studentRegNo = studentsInfo[attributes].registration_num;
              
              studentRegNoList.push(studentRegNo);

              this.setState({
                studentRegNoList: studentRegNoList,
              });
              
            }
          }
        }
      });
  };
  upgradeStudent = (item) => {
    Firebase.database()
      .ref("students")
      .orderByChild("registration_num")
      .equalTo(item)
      .once("value")
      .then((res) => {
        var studentInfo =res.val();
        for(var attributes in studentInfo){
          let registration_num = studentInfo[attributes].registration_num
          alert("Semester updated for Reg No - "+ registration_num);
        }
        res.forEach(record => {
          
          Firebase.database()
            .ref("students/" + record.key)
            .update({
              semester: parseInt(this.state.currentSem,10)+1,
            });
            
        });
      });
  };
  renderRegNo = (item) => {
    return (
      <View style={styles.containerRegNo}>
        <View style={styles.inputContainer}>
          <Text>{item}</Text>
          <TouchableHighlight
            style={[styles.upgradeContainer, styles.clickButton]}
            onPress={() => this.upgradeStudent(item)}
          >
            <Text style={styles.clickText}>Upgrade</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeUser}>Upgrade Semester</Text>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../images/semester.png")}
          />
          <Picker
            selectedValue={this.state.currentSem}
            style={{ height: 50, width: 180, marginLeft: "5%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ currentSem: itemValue })
            }
          >
            <Picker.Item label="Select Semester" value="semester" />
            <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../images/department.jpg")}
          />
          <Picker
            selectedValue={this.state.department}
            style={{ height: 50, width: 220, marginLeft: "6%" }}
            onValueChange={this.updateDepartment}
          >
            <Picker.Item label="Select Department" value="1" />
            <Picker.Item label="Civil Engineering" value="Civil Engineering" />
            <Picker.Item
              label="Mechanical Engineering"
              value="Mechanical Engineering"
            />
            <Picker.Item
              label="Computer Sc. & Engineering"
              value="Computer Sc. & Engineering"
            />
          </Picker>
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() => this.showStudents()}
        >
          <Text style={styles.clickText}>Submit</Text>
        </TouchableHighlight>

        <FlatList
          data={this.state.studentRegNoList}
          keyExtractor={({item}) => item}                

          renderItem={({ item }) => this.renderRegNo(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 25,
    marginLeft: 45,
    paddingBottom: 20,
  },

  inputContainer: {
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 15,
  },
  upgradeContainer: {
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: "25%",
  },
  clickButton: {
    backgroundColor: "#00b5ec",
  },
  imageChooseButtonContainer: {
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 10,
    marginRight: 15,
    marginTop: 20,
  },
  imageChooseclickButton: {
    backgroundColor: "#a0522d",
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 28,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7",
    marginBottom: "10%",
  },
});
