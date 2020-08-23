import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Image,
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
      year: "",
      department: "",
    };
  }
  updateDepartment = (department) => {
    this.setState({ department: department });
  };
  render() {
    return (
        
      <View style={styles.container}>
      <Text style={styles.welcomeUser}>
          Upgrade Semester
        </Text>
        <ScrollView>
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
              <Picker.Item label="1st" value="1st" />
              <Picker.Item label="2nd" value="2nd" />
              <Picker.Item label="3rd" value="3rd" />
              <Picker.Item label="4th" value="4th" />
              <Picker.Item label="5th" value="5th" />
              <Picker.Item label="6th" value="6th" />
              <Picker.Item label="7th" value="7th" />
              <Picker.Item label="8th" value="8th" />
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/year.jpg")}
            />
            <Picker
              selectedValue={this.state.year}
              style={{ height: 50, width: 180, marginLeft: "5%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ year: itemValue })
              }
            >
              <Picker.Item label="Select Year" value="2016" />
              <Picker.Item label="2016" value="2016" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
            </Picker>
          </View>
          
          <View  style={styles.inputContainer}>
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
              <Picker.Item
                label="Civil Engineering"
                value="Civil Engineering"
              />
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom:"10%"
  },
});
