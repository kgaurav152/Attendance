import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
class AttendanceScreen extends Component {
  state = { department: "", semseter: "", subject: "" };
  updateDepartment = department => {
    this.setState({ department: department });
  };
  updateSemester = semester => {
    this.setState({ semester: semester });
  };
  updateSubject = subject => {
    this.setState({ subject: subject });
  };
  constructor(props) {
    super(props);

    this.state = { date: null };
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
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2099"
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
              value="Mechanical Engg."
            />
            <Picker.Item
              label='Computer Sc. & Engg. '
              value='Computer Sc. & Engg.'
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
            <Picker.Item label="3rd " value="3rd" />
            <Picker.Item label="4th " value="4th" />
            <Picker.Item label="5th" value="5th" />
            <Picker.Item label="6th " value="6th" />
            <Picker.Item label="7th " value="7th" />
            <Picker.Item label="8th " value="8th" />
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
          onPress={() =>
            this.props.navigation.navigate("AddAttendance", {
              department: this.state.department,
              semester: this.state.semseter,
              subject: this.state.subject,
              date:this.state.date
            })
          }
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
    color: "#f4a460",
    fontSize: 18,
    marginTop: 8,
    marginLeft: 14,
    marginBottom: 26
  },
  fixSize: {
    justifyContent: "space-between",
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
