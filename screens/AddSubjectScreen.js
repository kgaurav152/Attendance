import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Image,
  TouchableHighlight
} from "react-native";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
function Separator() {
  return <View style={styles.separator} />;
}
export default class AddFacultyScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      subjectCode: "",
      subjectName: "",
      department: "",
      semester: "",
      errorMessage: null
    };
  }
  writeSubjectData = () => {
    Firebase.database()
      .ref("Subjects/")
      .push({
        department: this.state.department,
        subjectName: this.state.subjectName,
        SubjectCode: this.state.subjectCode,
        semester: this.state.semester
      });
    this.confirmAlert();
  };
  confirmAlert = () => {
    this.setState({
      confirmAlert: true
    });
  };
  departmentAlert=()=>{
    this.setState({
        departmentAlert:true
    });
  };
semAlert=()=>{
  this.setState({
    semAlert:true
  });
};
subjectNameAlert=()=>{
  this.setState({
    subjectNameAlert:true
  });
};
subjectCodeAlert=()=>{
  this.setState({
    subjectCodeAlert:true
  });
};
  hideAlert = () => {
    this.setState({
      confirmAlert: false,
      departmentAlert:false,
      semAlert:false,
      subjectNameAlert:false,
      subjectCodeAlert:false,
      department:'department',
      semester:'semester',
      subjectCode:'',
      subjectName:''

    });
  };
  checkCondition = () => {
    if (
      this.state.department == null ||
      this.state.department == undefined ||
      this.state.department == "" ||
      this.state.department == "department"
    ) {
      this.departmentAlert();
    } else if (
      this.state.semester == null ||
      this.state.semester == undefined ||
      this.state.semester == "" ||
      this.state.semester == "semester"
    ) {
      this.semAlert();
    } else if (
      this.state.subjectName == "" ||
      this.state.subjectName == null ||
      this.state.subjectName == undefined
    ) {
      this.subjectNameAlert();
    } else if (
      this.state.subjectCode == "" ||
      this.state.subjectCode == null ||
      this.state.subjectCode == undefined
    ) {
      this.subjectCodeAlert();
    }
    else{
      this.writeSubjectData();
    }
  };
  render() {
    const { confirmAlert, departmentAlert,semAlert,subjectNameAlert,subjectCodeAlert } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
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
              <Picker.Item label="Department" value="department" />
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
           
            <TextInput
              style={styles.inputs}
              placeholder="Subject Name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={subjectName => this.setState({ subjectName })}
              value={this.state.subjectName}
            />
          </View>

          <View style={styles.inputContainer}>
                        <TextInput
              style={styles.inputs}
              placeholder="Subject Code"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={subjectCode => this.setState({ subjectCode })}
              value={this.state.subjectCode}
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.checkCondition()}
          >
            <Text style={styles.clickText}>Add Subject</Text>
          </TouchableHighlight>
          <Separator/>
          <AwesomeAlert
            show={confirmAlert}
            showProgress={false}
            title="Alert !"
            message="Subject Added Successfully."
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
            show={departmentAlert}
            showProgress={false}
            title="Ooops !"
            message="Please Choose Department."
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
            show={semAlert}
            showProgress={false}
            title="Ooops !"
            message="Please Choose Semester."
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
            show={subjectNameAlert}
            showProgress={false}
            title="Ooops !"
            message="Subject Name can't be Empty."
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
            show={subjectCodeAlert}
            showProgress={false}
            title="Ooops !"
            message="Subject Code can't be Empty."
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
    marginTop: "10%",
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
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});
