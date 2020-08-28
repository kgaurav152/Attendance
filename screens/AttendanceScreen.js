import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Alert,
  TouchableHighlight,
  AsyncStorage,
  
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import DatePicker from "react-native-datepicker";
import Firebase from "../components/config";
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
var currentDate = moment().format("YYYY-MM-DD");

class AttendanceScreen extends Component {
  state = {
    department: "",
    semester: "",
    subject: "",
    date: "",
    selectedSubject: "",
    selectedSem:"",
    subjectList: [],
    name:"",
    facultyDepartment:"",
    email:"",
    imageUrl:"",
    subjectSems:[],
    subjectNames:[]
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
  hideAlert = () => {
    this.setState({
      semAlert:false,
      departmentAlert:false,
      subjectAlert:false,
      dateAlert:false
    });
  };
  dateAlert=()=>{
    this.setState({
      dateAlert:true
    });
  };
  subjectAlert = () => {
    this.setState({
      subjectAlert: true,
      
    });
  };
  departmentAlert = () => {
    this.setState({
      departmentAlert: true,
      
    });
  };
  semAlert=()=>{
    this.setState({
      semAlert:true
    });
  };
componentDidMount(){
  let subjectNames=[], subjectSems=[]
  const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const facultyDepartment = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
    const subjectInfo=navigation.getParam("subjectInfo");
    for(var attributes in subjectInfo){
      var subjectName= subjectInfo[attributes].subjectName;
       var subjectSem = subjectInfo[attributes].subjectSem
       subjectNames.push(subjectName);
       subjectSems.push(subjectSem)
      
    }
    
    this.setState({
      name:name,
      email:email,
      facultyDepartment:facultyDepartment,
      mobile:mobile,
      imageUrl:imageUrl,
      subjectNames:subjectNames,
      subjectSems:subjectSems
      
    })
    console.log(this.state.subjectNames)
}
  attendanceHandler = () => {
    if (this.state.department == "" || this.state.department =='1') {
      this.departmentAlert();
    } else if (this.state.selectedSem == "" || this.state.selectedSem=='1') {
      this.semAlert();
    } else if (this.state.selectedSubject == "" || this.state.selectedSubject=='1') {
      this.subjectAlert();
    } 
    else if (this.state.date==""){
      this.dateAlert();
    }
    else {
      this.props.navigation.navigate("AddAttendance", {
        department: this.state.department,
        semester: this.state.selectedSem,
        subject: this.state.selectedSubject,
        date: this.state.date,
        name:this.state.name,
        email:this.state.email,
        facultyDepartment:this.state.facultyDepartment,
        imageUrl:this.state.imageUrl,
        mobile:this.state.mobile,
        
      });
    }
  };
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextState.email != this.state.email ||
      nextState.department != this.state.department ||
      nextState.semester != this.state.semester
    ) {
      
      
      var subjectList = [];
     NetInfo.fetch().then( (state ) => {
         if(state.isConnected!=true){
          AsyncStorage.getItem(this.state.department 
            + this.state.semester + "subjectList").then( val => {
              if(val != null )
              this.setState({
                subjectList: JSON.parse(val)
              });
            });

         }else{
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
                    this.setState({
                      subjectList: subjectList
                    });
                    AsyncStorage.setItem( this.state.department 
                      + this.state.semester + "subjectList", JSON.stringify(subjectList)); 
                     
                }
                
              }
            }
          })
          .catch( error => {
                     console.log( error );
          });
    
         }  
     })
     
    }
  }

  render() {
    let subjectItems = this.state.subjectNames.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    let sems = this.state.subjectSems.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    
    const {departmentAlert,subjectAlert,semAlert,dateAlert } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.fixSize}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Select Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            maxDate={currentDate}
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
            style={{ height: 50, width: 220, marginLeft: "24%" }}
            onValueChange={this.updateDepartment}
          >
            <Picker.Item label="Select Department" value="1" />
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
            selectedValue={this.state.selectedSem}
            style={{ height: 50, width: 220, marginLeft: "24%" }}
            onValueChange={semLists =>
              this.setState({ selectedSem: semLists })
            }
          >
            <Picker.Item label="Choose Semester" value="1" />

            {sems}
          </Picker>
        </View>
        <View>
          <Picker
            selectedValue={this.state.selectedSubject}
            style={{ height: 50, width: 220, marginLeft: "24%" }}
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
        <AwesomeAlert
          show={subjectAlert}
          showProgress={false}
          title="Oops !"
          message="Please Choose Subject"
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
          title="Oops !"
          message="Please Choose Department"
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
          title="Oops !"
          message="Please Choose Semester"
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
          show={dateAlert}
          showProgress={false}
          title="Oops !"
          message="Please Select a Date"
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
export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignContent: "center"
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
    marginLeft: 60
  },
  clickButton: {
    backgroundColor: "#00b5ec"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  }
});
