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
  KeyboardAvoidingView
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
      email: "",
      name: "",
      department: "",
      errorMessage: null,
      imageUrl: null,
      semester: "",
      session: "",
      year: "",
      mobile: "",
      reg_no: ""
    };
  }

  checkCondition = () => {
    if (
      this.state.name == null ||
      this.state.name == "" ||
      this.state.name == undefined
    ) {
      this.nameAlert();
    } else if (
      this.state.reg_no == null ||
      this.state.reg_no == "" ||
      this.state.reg_no == undefined
    ) {
      this.reg_noAlert();
    } else if (
      this.state.department == null ||
      this.state.department == "" ||
      this.state.department == undefined
    ) {
      this.departmentAlert();
    } else if (
      this.state.semester == null ||
      this.state.semester == "" ||
      this.state.semester == undefined
    ) {
      this.semAlert();
    } else if (
      this.state.email == null ||
      this.state.email == "" ||
      this.state.email == undefined
    ) {
      this.emailAlert();
    } else if (
      this.state.mobile == null ||
      this.state.mobile == undefined ||
      this.state.mobile == ""
    ) {
      this.mobileAlert();
    } else {
      this.showAlert();
    }
  };

  nameAlert = () => {
    this.setState({
      nameAlert: true
    });
  };
  reg_noAlert = () => {
    this.setState({
      reg_noAlert: true
    });
  };
  departmentAlert = () => {
    this.setState({
      departmentAlert: true
    });
  };
  semAlert = () => {
    this.setState({
      semAlert: true
    });
  };
  emailAlert = () => {
    this.setState({
      emailAlert: true
    });
  };
  mobileAlert = () => {
    this.setState({
      mobileAlert: true
    });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
      nameAlert: false,
      reg_noAlert: false,
      departmentAlert: false,
      semAlert: false,
      emailAlert: false,
      mobileAlert: false
    });
  };
  confirmationAlert = () => {
    this.setState({
      confirmationAlert: true
    });
  };
  hideConfirmationAlert=()=>{
    this.setState({
      confirmationAlert:false
    });
  };
  hideErrorAlert=()=>{
    this.setState({
      errorAlert:false
    })
  }
  errorAlert=()=>{
    this.setState({
      errorAlert:true
    })
  }
  writeStudentData = () => {
    this.setState({
      showAlert:false
    })
    Firebase.database()
      .ref("students/")
      .orderByChild("email")
      .equalTo(this.state.email)
      .once("value")
      .then(res => {
        var value = res.val();
        if(value==null || value==undefined || value ==""){
          this.errorAlert();
        } else{
        res.forEach(record => {
          Firebase.database()
            .ref("students/" + record.key)
            .set({
              name: this.state.name,
              department: this.state.department,
              image: this.state.image,
              session: this.state.session,
              semester: this.state.semester,
              mobile: this.state.mobile,
              year: this.state.year,
              registration_num: this.state.reg_no,
              email: this.state.email
            });
          this.confirmationAlert();
          this.setState({
            email: "",
            name: "",
            department: "",
            errorMessage: null,
            image: null,
            semester: "",
            session: "",
            year: "",
            mobile: "",
            reg_no: "",
            showAlert: false
          });
        
        });
      }
      });
  };
  render() {
    let {
      image,
      confirmationAlert,
      showAlert,
      nameAlert,
      reg_noAlert,
      departmentAlert,
      semAlert,
      emailAlert,
      mobileAlert,
      errorAlert
    } = this.state;

    return (
      <View style={styles.container}>
      
        <ScrollView>
        
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/name.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/reg.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Registration no."
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={reg_no => this.setState({ reg_no })}
              value={this.state.reg_no}
            />
          </View>
          <View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/department.jpg")}
            />

            <Picker
              selectedValue={this.state.department}
              style={{ height: 50, width: 180, marginLeft: "5%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ department: itemValue })
              }
            >
              <Picker.Item label="Select Department" value="department" />
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
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/semester.png")}
            />
            <Picker
              selectedValue={this.state.semester}
              style={{ height: 50, width: 180, marginLeft: "5%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ semester: itemValue })
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
            <TextInput
              style={styles.inputs}
              placeholder="Year"
              underlineColorAndroid="transparent"
              onChangeText={year => this.setState({ year })}
              value={this.state.year}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/sessions.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Session"
              underlineColorAndroid="transparent"
              onChangeText={session => this.setState({ session })}
              value={this.state.session}
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
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/mobile.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Mobile"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={mobile => this.setState({ mobile })}
              value={this.state.mobile}
            />
          </View>
          
          </View>
                  <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.checkCondition()}
          >
            <Text style={styles.clickText}>Add Student</Text>
          </TouchableHighlight>
          <AwesomeAlert
            show={confirmationAlert}
            showProgress={false}
            title={"A Student"}
            message={"added Successfully !"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
            }}
            confirmButtonColor="#10356c"
            onCancelPressed={() => {
              this.hideConfirmationAlert();
            }}
            onConfirmPressed={() => {
              this.hideConfirmationAlert();
            }}
          />
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={"Email - " + this.state.email}
            message={"Reg. No- " + this.state.reg_no}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Confirm"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
            }}
            confirmButtonColor="#10356c"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.writeStudentData();
            }}
          />
          <AwesomeAlert
            show={nameAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Name can't be empty"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
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
            show={reg_noAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Reg No can't be empty"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
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
            show={departmentAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Please Choose department"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
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
            show={semAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Please Choose semester"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
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
            show={emailAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Email can't be empty"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
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
            show={mobileAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Mobile No. can't be empty"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
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
            show={errorAlert}
            showProgress={false}
            title={"Oops!"}
            message={"Email Should be match with a valid user !"}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "60%"
            }}
            confirmButtonColor="#10356c"
            onCancelPressed={() => {
              this.hideErrorAlert();
            }}
            onConfirmPressed={() => {
              this.hideErrorAlert();
            }}
          />
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
    paddingBottom: 20
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
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 15
  },
  clickButton: {
    backgroundColor: "#00b5ec"
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
    marginTop: 20
  },
  imageChooseclickButton: {
    backgroundColor: "#a0522d"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  },
  studentDetail: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#d2691e"
  }
});
