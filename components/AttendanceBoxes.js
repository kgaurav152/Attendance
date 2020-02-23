import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, FlatList } from "react-native";
import AttendanceBox from "./AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";
import Firebase from "../components/config";
import moment from "moment";

class AttendanceBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: this.props.data,
      attendanceList: new Map(),
      department: this.props.dept,
      subject: this.props.sub,
      semester: this.props.sem,
      date:this.props.date
    };

    this.addPresentStudent = this.addPresentStudent.bind(this);
  }

  addPresentStudent(regNo) {
    console.log("add Registration is being called.");
    const { attendanceList } = this.state;
    const {studentList} = this.state;
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
  submitHandler = () => {
    var db_department = "";
    var db_semester = "";
    var db_date = "";
    var db_subject = "";
    let studentList = this.state.studentList;
    let attendanceList = this.state.attendanceList;
    for(var student in studentList){
      if(attendanceList[studentList[student]] === true){
        attendanceList[studentList[student]] = true;
      }
      else{
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
          db_date = attendanceInfo[attributes].date
          if (db_department === this.state.department) {
            if (db_semester === this.state.semester) {
              if (db_subject === this.state.subject) {
              if(db_date === this.state.date){
                uid = attributes
              }
            }
          }
        }
      }
      Firebase.database()
      .ref("attendance").child(uid).update({date: this.state.date, attendanceList : this.state.attendanceList});
               
      });
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          marginLeft="3%"
          numColumns={4}
          data={this.state.studentList}
          renderItem={({ item }) => (
            <AttendanceBox id={item} addRegNo={this.addPresentStudent} />
          )}
        />
        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() => this.submitHandler()}
        >
          <Text style={styles.clickText}>Submit</Text>
        </TouchableHighlight>
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
