import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  Picker,
  ScrollView,
  Alert
} from "react-native";
import DatePicker from "react-native-datepicker";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeAlert from "react-native-awesome-alerts";
function Separator() {
  return <View style={styles.separator} />;
}

export default class StudentAttendanceScreen extends Component {
  state = { startDate: "", subject: "", endDate: "", semester: "" };
  updateSubject = subject => {
    this.setState({ subject: subject });
  };
  constructor(props) {
    super(props);

    this.state = { selectedSubject: "",
    subjectList: [] };
  }
  handleAttendance = () => {
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const reg_no = navigation.getParam("reg_no");
    const department = navigation.getParam("department");
    const sem = navigation.getParam("sem");

    const Reg_no = reg_no.substring(8, reg_no.length);

    var db_department = "";
    var db_semester = "";
    var db_date = "";
    var db_subject = "";
    Firebase.database()
      .ref("attendance")
      .orderByChild("date")
      .startAt(this.state.startDate)
      .endAt(this.state.endDate)
      .once("value")
      .then(snapshot => {
        const attendanceInfo = snapshot.val();
        const dateSelected = [];
        const presentStatelist = [];
        for (var attributes in attendanceInfo) {
          var dateDb = attendanceInfo[attributes].date;
          var flag = 1;
          for (var date in dateSelected) {
            if (dateSelected[date] === dateDb) {
              flag = 0;
            }
          }
          if (flag === 1) {
            dateSelected.push(dateDb);
          }
        }
        for (var date in dateSelected) {
          for (var attributes in attendanceInfo) {
            db_department = attendanceInfo[attributes].department;
            db_semester = attendanceInfo[attributes].semester;
            db_date = attendanceInfo[attributes].date;
            db_subject = attendanceInfo[attributes].subject;
            if (db_department === department) {
              if (db_semester === sem) {
                if (db_date === dateSelected[date]) {
                  if (db_subject === this.state.selectedSubject) {
                    //const studentattnd = attendanceInfo[attributes].attendanceList

                    var presentState =
                      attendanceInfo[attributes].attendanceList[Reg_no];
                    presentStatelist.push(presentState);
                  }
                }
              }
            }
          }
        }

        if (presentState) {
          this.props.navigation.navigate("ShowAttendance", {
            email,
            name,
            reg_no,
            department,
            sem,
            presentStatelist,
            dateSelected
          });
        }
        this.showAlert();
      });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
      emailUsed: false,
      email: "",
      password: "",
      role: ""
    });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  componentWillUpdate(nextProps, nextState) {
    if (
      
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
            if (db_department === department) {
              if (db_semester === semester) {
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
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const reg_no = navigation.getParam("reg_no");
    const department = navigation.getParam("department");
    const sem = navigation.getParam("sem");
    const { showAlert } = this.state;
    let subjectItems = this.state.subjectList.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    return (
      <View style={styles.container}>
        <Text style={styles.title}>View Attendance</Text>
        <View style={styles.fixImage}>
          <View>
            <Text style={styles.paragraph}>Choose Start Date </Text>
            <DatePicker
              mode="date" //The enum of date, datetime and time
              placeholder="Select Date"
              format="YYYY-MM-DD"
              date={this.state.startDate}
              onDateChange={startDate => {
                this.setState({ startDate: startDate });
              }}
            />
          </View>
          <View>
            <Text style={styles.paragraph}>Choose End Date </Text>
            <DatePicker
              date={this.state.endDate}
              mode="date" //The enum of date, datetime and time
              placeholder="Select Date"
              format="YYYY-MM-DD"
              onDateChange={endDate => {
                this.setState({ endDate: endDate });
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            marginTop: "8%",
            marginBottom: "3%",
            marginLeft: "20%",
            paddingRight: "20%"
          }}
        >
        <Picker
        selectedValue={this.state.selectedSubject}
        
        onValueChange={subjectLists =>
          this.setState({ selectedSubject: subjectLists })
        }
      >
        <Picker.Item label="Choose Subject" value="1" />

        {subjectItems}
      </Picker>
        </View>
        <View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.handleAttendance()}
          >
            <Text style={styles.clickText}>Show Attendance</Text>
          </TouchableHighlight>
        </View>

        <Separator />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Oops !"
          message="You are not attend any class between these date."
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  button: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    marginBottom: "10%",
    marginLeft: "6%",
    fontSize: 20,
    color: "#09C5F7",
    fontWeight: "bold"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginLeft: "17%",
    borderRadius: 30
  },
  clickButton: {
    backgroundColor: "#09C5F7"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
    marginLeft: 15
  },
  headText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 14
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
