import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import UpdateAttendanceBox from "./UpdateAttendanceBox";
import { ScrollView } from "react-native-gesture-handler";
import Firebase from "../components/config";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";

class UpdateAttendanceBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: this.props.data,
      attendanceList: new Map(),
      department: this.props.dept,
      subject: this.props.sub,
      semester: this.props.sem,
      date: this.props.date,
      uid: this.props.uid,
      loading: false,
      facultyDepartment: this.props.facultyDepartment,
      mobile: this.props.mobile,
      imageUrl: this.props.imageUrl,
      name: this.props.name,
      email: this.props.email,
      countStudentList: "",
      countAttendanceList: "",
    };

    this.addPresentStudent = this.addPresentStudent.bind(this);
    this.addAbsentStudent = this.addAbsentStudent.bind(this);
  }

  addPresentStudent(regNo) {
    const { attendanceList } = this.state;
    attendanceList[regNo] = true; //Map Attendance
    this.setState({ attendanceList: attendanceList });
  }
  addAbsentStudent(regNo) {
    const { attendanceList } = this.state;
    attendanceList[regNo] = false; //Map Attendance
    this.setState({ attendanceList: attendanceList });
  }
  countStudent = () => {
    let countStudentList = Object.keys(this.state.studentList).length;
    var studentList = studentArray;
    var attendanceList = this.state.attendanceList;
    for (var student in studentList) {
      if (attendanceList[studentList[student]["regNo"]] === true) {
        attendanceList[studentList[student].regNo] = true;
      } else {
        attendanceList[studentList[student]["regNo"]] = false;
      }
    }

    this.setState(
      {
        attendanceList: attendanceList,
      },
  
    );

    let countPresentRegNo = Object.values(this.state.attendanceList).reduce((a, b) => a + b,0)
    this.setState({
      countAttendanceList: countPresentRegNo,
      countStudentList: countStudentList,
    });
    this.showAlert();
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  updateAttendanceAlert = () => {
    this.setState({
      updateAttendanceAlert: true,
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  submitHandler = () => {
    this.setState({
      loading: true,
    });

    Firebase.database().ref("attendance").child(this.state.uid).update({
      attendanceList: this.state.attendanceList,
    });
    this.props.navigation.navigate("FacultyWelcome");
  };
  render() {
    const { studentList, showAlert, updateAttendanceAlert } = this.state;
    studentArray = [];
    Object.keys(studentList).forEach((key) => {
      let stud = {};
      stud.regNo = key;
      stud.presence = studentList[key];
      studentArray.push(stud);
    });

    return (
      <View>
        <FlatList
          marginLeft="3%"
          windowSize={3}
          initialNumToRender={7}
          numColumns={4}
          data={studentArray}
          renderItem={({ item }) => (
            <UpdateAttendanceBox
              id={item}
              addRegNo={this.addPresentStudent}
              removeRegNo={this.addAbsentStudent}
            />
          )}
        />

        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() => this.countStudent()}
        >
          <Text style={styles.clickText}>Submit</Text>
        </TouchableHighlight>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={"Present Student - " + this.state.countAttendanceList}
          message={"Total Student - " + this.state.countStudentList}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Confirm"
          contentContainerStyle={{
            backgroundColor: "white",
            width: "80%",
            height: "35%",
            marginTop: "30%",
          }}
          confirmButtonColor="#10356c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.submitHandler();
          }}
        />
        <AwesomeAlert
          show={updateAttendanceAlert}
          showProgress={false}
          title={"Attendance Updated Successfully"}
          message={"for date" + this.state.date}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="OK !"
          contentContainerStyle={{
            backgroundColor: "white",
            width: "80%",
            height: "35%",
            marginTop: "30%",
          }}
          confirmButtonColor="#10356c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.props.navigation.navigate("FacultyWelcome");
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    marginLeft: 40,
  },
  clickButton: {
    backgroundColor: "#00b5ec",
  },
  clickText: {
    color: "white",
    fontWeight: "800",
  },
});

export default UpdateAttendanceBoxes;
