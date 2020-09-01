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
  Alert,
  ScrollView
} from "react-native";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";


export default class RegisterUserScreen extends Component {
    constructor(props) {
        super();
        this.state = {
          email: "",
          name: "",
          department: "",
          errorMessage: null,
          role:"student",
          semester: "",
          session: "",
          year: "",
          mobile: "",
          reg_no: "",
          password:"12345678",
          showAlert:false
        };
      }
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
      mobileAlert: false,
      emailUsed:false
    });
  };
  confirmationAlert = () => {
    this.setState({
      confirmationAlert: true,
          email: undefined,
          name: "",
          department: "",
          errorMessage: null,
          semester: "",
          session: "",
          year: "",
          mobile: "",
          reg_no: "",

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
  emailUsed = () => {
    this.setState({
      emailUsed: true
    });
  };
  errorAlert=()=>{
    this.setState({
      errorAlert:true
    })
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

  sendForApproval = () => {
    this.setState({
      showAlert:false
    })
      Firebase.database()
      .ref("HandleRegistration")
      .push({
          email: this.state.email,
          password: this.state.password,
          name:this.state.name,
          role: this.state.role,
          Reg_No: this.state.reg_no,
          department: this.state.department,
          semester: this.state.semester,
          session: this.state.session,
          year:this.state.year,
          mobile:this.state.mobile

      }).then(()=>{
        this.confirmationAlert();
      }).catch(error => {
        this.setState({
          error: error.code
        });
        if (this.state.error === "auth/email-already-in-use") {
          this.emailUsed();
        } else {
        }
      });
      
  }
  

  render() {
    
    let {
      
        confirmationAlert,
        showAlert,
        nameAlert,
        reg_noAlert,
        departmentAlert,
        semAlert,
        emailAlert,
        mobileAlert,
        errorAlert,
        emailUsed
      } = this.state;
    return (
      <ScrollView>
          <View style={styles.container}>
        
        
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
          <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/mailIcon.jpg")}
                />
                <TextInput
                  caretHidden
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>


        


        <TouchableHighlight
          style={[styles.buttonContainer, styles.registerButton]}
          onPress={() => this.checkCondition()}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainerLogin, styles.loginButton]}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Have an Account ? Login Here</Text>
        </TouchableHighlight>

        <AwesomeAlert
            show={confirmationAlert}
            showProgress={false}
            title={"Contact your HOD"}
            message={"Your registration is in Verification."}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="OK !"
            contentContainerStyle={{
              backgroundColor: "white",
              width: "150%",
              height: "20%"
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
        show={emailUsed}
        showProgress={false}
        title="SignUp alert"
        message="Email already in use"
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
              height: "20%"
            }}
            confirmButtonColor="#10356c"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.sendForApproval();
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
          
      </View>
      </ScrollView>
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
    width: 250,
    borderRadius: 30
  },
  registerButton: {
    backgroundColor: "#10356c",
    marginTop: 30
  },
  registerText: {
    color: "white"
  },
  buttonContainerLogin: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#10356c",
    marginTop: 30
  },
  loginText: {
    color: "white"
  }
});
