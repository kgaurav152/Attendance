import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  Picker,
  ScrollView
} from "react-native";
import DatePicker from "react-native-datepicker";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
import AwesomeButton from "react-native-really-awesome-button";
function Separator() {
  return <View style={styles.separator} />;
}

export default class StudentAttendanceScreen extends Component {
  state = { startDate: "", subject: "", endDate: "" ,semester:""};
  updateSubject = subject => {
    this.setState({ subject: subject });
  };
  constructor(props) {
    super(props);
    
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
          for(var date in dateSelected){
            if(dateSelected[date] === dateDb){
              flag = 0;
            }
          }
          if(flag === 1){
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
                  if (db_subject === this.state.subject) {
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
      });
  };

  render() {
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const reg_no = navigation.getParam("reg_no");
    const department = navigation.getParam("department");
    const sem = navigation.getParam("sem");

    return (
      <SafeAreaView style={styles.container}>
        <Card
          title="View Attendance"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15,

            fontWeight: "800"
          }}
        />
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
          
        </View>
        <View style={styles.button}>
        <AwesomeButton
        progress
        
        onPress={next => {
          this.handleAttendance();
          next();
        }}
        backgroundColor="#9400d3"
      >
        Show
      </AwesomeButton>
      </View>

        <Separator />
      </SafeAreaView>
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
  button:{
    justifyContent:"center",
    alignItems:"center"
  },
  buttonContainer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15
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
