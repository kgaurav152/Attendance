import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
import Firebase from "../components/config";

class AttendanceScreen extends Component {
  state = {
    department: "",
    semester: "",
    subject: "",
    date: "",
    selectedSubject: "",
    subjectList: []
  };
  updateDepartment = department => {
    this.setState({ department: department });
  };
  updateSemester = semester => {
    this.setState({ semester: semester });
  };
  updateSubject = subject => {
    this.setState({ subject: subject });
  };

  attendanceHandler = () => {
    this.props.navigation.navigate("AddAttendance", {
      department: this.state.department,
      semester: this.state.semester,
      subject: this.state.selectedSubject,
      date: this.state.date
    });
  };
  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.email != this.state.email ||
      nextState.department != this.state.department ||
      nextState.semester != this.state.semester
    ) {
      console.log("Component did mound is being callled...");
      var subjectList = [];
      Firebase.database()
        .ref("Subjects")
        .once("value")
        .then(snapshot => {
          var subjectInfo = snapshot.val();
          var db_department = "";
          var db_semester = "";
          for (var attributes in subjectInfo) {
            db_department = subjectInfo[attributes].department;
            db_semester = subjectInfo[attributes].semester;
            if (db_department === this.state.department) {
              if (db_semester === this.state.semester) {
                var subjectData = subjectInfo[attributes].subjectName;
                subjectList.push(subjectData);
              }
              console.log(subjectList);

              this.setState({
                subjectList: subjectList
              });
            }
          }
        });
    }
  }

  render() {
    let subjectItems = this.state.subjectList.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    return (
      <View style={styles.container}>
        <View style={styles.fixSize}>
          <Text style={styles.headText}></Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Select Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
                marginTop: 4.2,
                marginBottom: 25
              },
              dateInput: {
                marginLeft: 36,
                marginTop: 25,
                marginBottom: 20,
                fontWeight: "700",
                marginRight: 10
              }
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>

        <View>
          <Picker
            selectedValue={this.state.department}
            style={{ height: 50, width: 180, marginLeft: "20%" }}
            onValueChange={this.updateDepartment}
          >
            <Picker.Item label="Select Department" value="Department" />
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
        <View>
          <Picker
            selectedValue={this.state.semester}
            style={{ height: 50, width: 180, marginLeft: "20%" }}
            onValueChange={this.updateSemester}
          >
            <Picker.Item label="Select Semester" value="Select Semester" />
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

        <View>
          <Picker
            selectedValue={this.state.selectedSubject}
            style={{ height: 50, width: 180, marginLeft: "20%" }}
            onValueChange={subjectLists =>
              this.setState({ selectedSubject: subjectLists })
            }
          >
            <Picker.Item label="Choose Subject" value="1" />

            {subjectItems}
          </Picker>
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() => this.attendanceHandler()}
        >
          <Text style={styles.clickText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "#87ceeb",
    fontWeight: "800"
  },
  headText: {
    fontWeight: "900",
    color: "#008b8b",
    fontSize: 18,
    marginTop: 8,
    marginLeft: "5%",
    marginBottom: "5%"
  },
  fixSize: {
    justifyContent: "center",
    flexDirection: "row"
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
