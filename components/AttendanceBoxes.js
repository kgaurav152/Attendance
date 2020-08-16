import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AttendanceBox from "./AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";
import Firebase from "../components/config";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";

class AttendanceBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: this.props.data,
      attendanceList: new Map(),
      department: this.props.dept,
      subject: this.props.sub,
      semester: this.props.sem,
      date: this.props.date,
      loading: false,
      facultyDepartment: this.props.facultyDepartment,
      mobile: this.props.mobile,
      imageUrl: this.props.imageUrl,
      name: this.props.name,
      email: this.props.email,
      countStudentList: "",
      countAttendanceList: ""
    };

    this.addPresentStudent = this.addPresentStudent.bind(this);
  }

  addPresentStudent(regNo) {
    console.log("add Registration is being called.");
    const { attendanceList } = this.state;
    const { studentList } = this.state;
    attendanceList[regNo] = true;
    this.setState(
      {
        attendanceList: attendanceList
      },
      () => {
        console.log(this.state.attendanceList);
      }
    );
  }
  countStudent = () => {
    let studentList = this.state.studentList;
    let countStudentList = studentList.length;

    let attendanceList = this.state.attendanceList;
    let presentRegNo = [];

    Object.keys(attendanceList).forEach(key => {
      const count = key;
      presentRegNo.push(count);
    });
    let countPresentRegNo = presentRegNo.length;
    this.setState({
      countAttendanceList: countPresentRegNo,
      countStudentList: countStudentList
    });
    this.showAlert();
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  submitHandler = () => {
    this.setState({
      loading: true
    });

    var db_department = "";
    var db_semester = "";
    var db_date = "";
    var db_subject = "";
    let studentList = this.state.studentList;
    let attendanceList = this.state.attendanceList;
    for (var student in studentList) {
      if (attendanceList[studentList[student]] === true) {
        attendanceList[studentList[student]] = true;
      } else {
        attendanceList[studentList[student]] = false;
      }
    }
    this.setState(
      {
        attendanceList: attendanceList
      },
      () => {
        console.log(this.state.attendanceList);
      }
    );
    NetInfo.fetch().done(isConnected => {
      if (isConnected) {
        Firebase.database()
          .ref("attendance")
          .once("value")
          .then(snapshot => {
            const attendanceInfo = snapshot.val();
            let uid = "";

            for (var attributes in attendanceInfo) {
              db_department = attendanceInfo[attributes].department;
              db_semester = attendanceInfo[attributes].semester;
              db_subject = attendanceInfo[attributes].subject;
              db_date = attendanceInfo[attributes].date;
              if (db_department === this.state.department) {
                if (db_semester === this.state.semester) {
                  if (db_subject === this.state.subject) {
                    if (db_date === this.state.date) {
                      uid = attributes;
                    }
                  }
                }
              }
            }
            if (uid == null || uid == "" || uid == undefined) {
              let attendanceObj = {
                attendanceList: this.state.attendanceList,
                department: this.state.department,
                date: this.state.date,
                subject: this.state.subject,
                semester: this.state.semester
              };

              Firebase.database()
                .ref("attendance/")
                .push(attendanceObj);

              this.setState({
                loading: false
              });
              this.props.navigation.navigate("FacultyWelcome", {
                name: this.state.name,
                facultyDepartment: this.state.facultyDepartment,
                email: this.state.email,
                imageUrl: this.state.imageUrl,
                mobile: this.state.mobile
              });
            } else {
              Firebase.database()
                .ref("attendance")
                .child(uid)
                .update({
                  date: this.state.date,
                  attendanceList: this.state.attendanceList
                });
              this.setState({
                loading: false
              });

              this.props.navigation.navigate("FacultyWelcome", {
                name: this.state.name,
                facultyDepartment: this.state.facultyDepartment,
                email: this.state.email,
                imageUrl: this.state.imageUrl,
                mobile: this.state.mobile
              });
            }
          });
      } else {
        let attendanceObj = {
          attendanceList: this.state.attendanceList,
          department: this.state.department,
          date: this.state.date,
          subject: this.state.subject,
          semester: this.state.semester
        };
        AsyncStorage.getItem("attendanceList")
          .then(val => {
            let attendanceArray = [];
            if (val != null && val != "") {
              attendanceArray = JSON.parse(val);
              attendanceArray.push(attendanceObj);
              AsyncStorage.setItem(
                "attendanceList",
                JSON.stringify(attendanceArray)
              );
            } else {
              attendanceArray.push(attendanceObj);
              AsyncStorage.setItem(
                "attendanceList",
                JSON.stringify(attendanceArray)
              );
            }
          })
          .catch(error => {
            console.log(" Error : " + error);
            AsyncStorage.setItem(
              "attendanceList",
              JSON.stringify(attendanceArray)
            );
          });
        this.setState({
          loading: false
        });
        this.props.navigation.navigate("FacultyWelcome", {
          name: this.state.name,
          facultyDepartment: this.state.facultyDepartment,
          email: this.state.email,
          imageUrl: this.state.imageUrl,
          mobile: this.state.mobile
        });
      }
    });
  };

  render() {
    const { showAlert } = this.state;
    return (
      <ScrollView>
        {this.state.loading === false ? (
          <View>
            <FlatList
              marginLeft="3%"
              windowSize={3}
              initialNumToRender={7}
              numColumns={4}
              data={this.state.studentList}
              renderItem={({ item }) => (
                <AttendanceBox id={item} addRegNo={this.addPresentStudent} />
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
                marginTop:'30%'
              }}
              confirmButtonColor="#10356c"
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.submitHandler();
              }}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
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
    marginLeft: 40
  },
  clickButton: {
    backgroundColor: "#00b5ec"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  }
});

export default AttendanceBoxes;
