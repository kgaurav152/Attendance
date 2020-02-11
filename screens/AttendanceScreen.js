import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
import Firebase from '../components/config'


class AttendanceScreen extends Component {
  state = { department: "", semester: "", subject: "", date:"" };
  updateDepartment = department => {
    this.setState({ department: department });
  };
  updateSemester = semester => {
    this.setState({ semester: semester });
  };
  updateSubject = subject => {
    this.setState({ subject: subject });
  };
  
  attendanceHandler=()=>{
    Firebase.database()
        .ref("attendance/")
        .push(
          {
            department:this.state.department,
            date:this.state.date,
            subject:this.state.subject,
            semester:this.state.semester
          }
        )
    this.props.navigation.navigate("AddAttendance", {
      department: this.state.department,
      semester: this.state.semester,
      subject: this.state.subject,
      date: this.state.date
    })
    
  
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.fixSize}>
      <Text style={styles.headText}>Select Date</Text>
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
          <Text style={styles.text}>{this.state.department}</Text>
        </View>
        <View>
          <Picker
            selectedValue={this.state.semester}
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
          <Text style={styles.text}>{this.state.semester}</Text>
        </View>

        <View>
          <Picker
            selectedValue={this.state.subject}
            onValueChange={this.updateSubject}
          >
            <Picker.Item label="Select Subject" value="Select Subject" />
            <Picker.Item label="Operating System" value="Operating System" />
            <Picker.Item label="Java" value="JAVA" />
            <Picker.Item label="DBMS" value="DBMS" />
          </Picker>
          <Text style={styles.text}>{this.state.subject}</Text>
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() =>this.attendanceHandler()}
            
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
    marginLeft: '5%',
    marginBottom: '5%'
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
