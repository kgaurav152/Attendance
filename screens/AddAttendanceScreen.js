import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Card } from "react-native-elements";
import AttendanceBoxes from "../components/AttendanceBoxes";
import Firebase from "../components/config";
export default class AddAttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regNoList: [],
      semester: "",
      department: "",
      subject: "",
      date: "",
      dataLoaded: false,
      name:"",
      email:"",
      facultyDepartment:"",
      mobile:"",
      imageUrl:""
     
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const department = navigation.getParam("department");
    const semester = navigation.getParam("semester");
    const subject = navigation.getParam("subject");
    const date = navigation.getParam("date");
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const facultyDepartment = navigation.getParam("facultyDepartment");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
    
    var db_department = "";
    var db_semester = "";
    var regNoList = [];
    this.setState({
      name:name,
      email:email,
      facultyDepartment:facultyDepartment,
      mobile:mobile,
      imageUrl:imageUrl
    })

    NetInfo.fetch().then((state) => {
      if(state.isConnected==true){
    Firebase.database()
      .ref("students")
      .once("value")
      .then(snapshot => {
        const studentInfo = snapshot.val();

        for (var attributes in studentInfo) {
          db_department = studentInfo[attributes].department;
          db_semester = studentInfo[attributes].semester;
          if (db_department === department) {
            if (db_semester == semester) {
              let obj={};
              obj.regNo = studentInfo[attributes].registration_num;
              obj.name = studentInfo[attributes].name;
              obj.regNo = obj.regNo.substring(8, obj.regNo.length);
              
              regNoList.push(obj)
              
            }
           var sortedRegNoList= regNoList.sort((a,b) => (a.regNo > b.regNo) ? 1 : ((b.regNo > a.regNo) ? -1 : 0)); 
          
          }
        }
        
        


        AsyncStorage.setItem( department + semester + "regNo", JSON.stringify(regNoList)); 
        this.setState({
          regNoList: sortedRegNoList,
          semester: semester,
          subject: subject,
          department: department,
          date: date,
          dataLoaded: true
        });  
      });

      }
      else{
        AsyncStorage.getItem(department + semester + "regNo").then( val => {
          if( val != null && val != undefined && val != "")
          this.setState({
            regNoList: JSON.parse(val),
            semester: semester,
            subject: subject,
            department: department,
            date: date,
            dataLoaded: true
          });  
        })

      }
    });
     
  }

  render() {
    const { navigation } = this.props;
    const department = navigation.getParam("department");
    const semester = navigation.getParam("semester");
    const subject = navigation.getParam("subject");
    const date = navigation.getParam("date");
    const dataLoaded = this.state.dataLoaded;

    return (
      <ScrollView>
        <Card
          title="Make today Attendance"
          titleStyle={{
            color: "#3498db",
            textAlign: "center",
            paddingLeft: 10,
            fontSize: 15,
            fontWeight: "800"
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>
                Department : {JSON.stringify(department).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                Subject : {JSON.stringify(subject).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                semester : {JSON.stringify(semester).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                Date : {JSON.stringify(date).replace(/\"/g, "")}
              </Text>
            </View>
          </View>
        </Card>

        {dataLoaded && (
          <AttendanceBoxes
            data={this.state.regNoList}
            dept={this.state.department}
            sem={this.state.semester}
            sub={this.state.subject}
            date={this.state.date}
            navigation = {navigation}
            name={this.state.name}
            email={this.state.email}
            facultyDepartment={this.state.facultyDepartment}
            imageUrl={this.state.imageUrl}
            mobile={this.state.mobile}
          />
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1
  },
  ButtonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#009688",
    borderRadius: 5,
    marginBottom: 20
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center"
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  regText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 6
  },
  fixTotext: {
    justifyContent: "center",
    flexDirection: "row"
  },
  preText: {
    fontWeight: "900",
    color: "green",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 6
  },
  absText: {
    fontWeight: "900",
    color: "red",
    marginRight: 8,
    fontSize: 18,
    marginTop: 20,
    marginLeft: 6
  },
  regNo: {
    fontWeight: "400",
    color: "black",
    fontSize: 18,
    marginTop: 4,
    marginLeft: 7
  }
});
