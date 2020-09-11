import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
class AttendanceInfoScreen extends Component {
  state = {
    department: "",
    semester: "",
    subject: "",
    startDate: "",
    endDate: "",
    
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
  constructor(props) {
    super(props);

    this.state = { startDate: "", endDate: "",selectedSubject: "",
    subjectList: [], facultyName:"",facultyEmail:"" };
  }
  showAlert=()=>{
    this.setState({
      showAlert:true
    })
  }
  hideAlert=()=>{
    this.setState({
      showAlert:false
    })
  }
  attendanceInfo = () => {
    const department = this.state.department;
    const sem = this.state.semester;
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
        const attendanceList = [];
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

        var dateList = [];
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
                    var attendance = attendanceInfo[attributes].attendanceList;
                    attendanceList.push(attendance);
                    var dateIn = attendanceInfo[attributes].date;
                    dateList.push(dateIn);
                  }
                }
              }
            }
          }
        }
        if(attendanceList.length!=0){
          this.props.navigation.navigate("FacultyReport", {
            department: this.state.department,
            semester: this.state.semester,
            subject: this.state.selectedSubject,
            dateList,
            attendanceList,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            facultyEmail:this.state.facultyEmail,
            facultyName:this.state.facultyName
          });}
          else{
            this.showAlert()
          }
        
        
      });
  };
  UNSAFE_componentWillUpdate(nextProps, nextState) {
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
             // console.log(subjectList);
    
            this.setState({
              subjectList: subjectList
            });
            }
          }
        });
    }
  }
componentDidMount(){
  const { navigation } = this.props;
    const facultyName = navigation.getParam("facultyName");
    const facultyEmail=navigation.getParam("facultyEmail");
    this.setState({
      facultyEmail:facultyEmail,
      facultyName:facultyName
    })
}
  render() {
    
    const {showAlert}=this.state;
    let subjectItems = this.state.subjectList.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    return (
      <View style={styles.container}>
      <View style={styles.fixDate}>
      
        <View style={styles.fixSize}>
          <DatePicker
            format="YYYY-MM-DD"
            date={this.state.startDate}
            onDateChange={startDate => {
              this.setState({ startDate: startDate });
            }}
          />
        </View>
        <View style={styles.fixSize}>
          <DatePicker
            format="YYYY-MM-DD"
            date={this.state.endDate}
            onDateChange={endDate => {
              this.setState({ endDate: endDate });
            }}
          />
        </View>
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
            <Picker.Item label="Department" value="1" />
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
            <Picker.Item label="Select Semester" value="1" />
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
          onPress={() => this.attendanceInfo()}
        >
          <Text style={styles.clickText}>Submit</Text>
        </TouchableHighlight>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={"No Record found."}
          //message={"for date" + this.state.date}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="OK !"
          contentContainerStyle={{
            backgroundColor: "white",
            width: "80%",
            height: "18%",
            //marginTop: "30%",
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
export default AttendanceInfoScreen;

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
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  fixDate:{
    justifyContent:'space-around',
    flexDirection:"row"
  }
});
