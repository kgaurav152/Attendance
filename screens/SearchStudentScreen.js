import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput,
  Picker
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
function Separator() {
  return <View style={styles.separator} />;
}

export default class SearchStudentScreen extends Component {
    state = {reg_no : "", name:"",department:"",mobile:"",email:"",imageUrl:"",sem:"",studentInfo:[]}
  searchStudent = () => {
      Firebase.database().ref("students").orderByChild("registration_num").equalTo(this.state.reg_no).once("value").then(snapshot =>{
          let studentInfo = snapshot.val();
          let name = null;
          let department = null;
          let mobile = null;
          let email = null;
          let reg_no = null;
          let imageUrl = null;
          let sem = null;
          let session= null;
          let year=null;
          for(var attributes in studentInfo){
              name = studentInfo[attributes].name;
              department = studentInfo[attributes].department;
              mobile = studentInfo[attributes].mobile;
              email = studentInfo[attributes].email;
              reg_no= studentInfo[attributes].registration_num
              sem = studentInfo[attributes].semester
              imageUrl =studentInfo[attributes].image;
              year =studentInfo[attributes].year;
              session =studentInfo[attributes].session;
          }
          this.setState({
            name: name,
            department: department,
            mobile: mobile,
            email: email,
            reg_no: reg_no,
            imageUrl: imageUrl,
            sem : sem,
            session:session,
            year:year
          });
          if(this.state.reg_no=== undefined ||this.state.reg_no===null){
            alert("No student found for your search.")
          }
          else{
            this.props.navigation.navigate("StudentDetail", {
              email:this.state.email,
              name:this.state.name,
              department:this.state.department,
              mobile:this.state.mobile,
              reg_no:this.state.reg_no,
              imageUrl:this.state.imageUrl,
              sem:this.state.sem,
              year:this.state.year,
              session:this.state.session
            });
          }
          
      }
        
        
        )
  }
  showStudents = () => {
    var studentInfo = [];
    Firebase.database()
      .ref("students")
      .once("value")
      .then((snapshot) => {
        var studentsInfo = snapshot.val();
        
        var db_sem = "";
        var db_department = "";
        for (var attributes in studentsInfo) {
          db_department = studentsInfo[attributes].department;
          db_sem = studentsInfo[attributes].semester;
          if (db_department === this.state.department) {
            if (db_sem == this.state.sem) {
              let obj={};
              obj.name=studentsInfo[attributes].name;
              obj.registration_num=studentsInfo[attributes].registration_num;
              obj.department=studentsInfo[attributes].department;
              obj.semester=studentsInfo[attributes].semester;
              obj.year=studentsInfo[attributes].year;
              obj.mobile=studentsInfo[attributes].mobile;
              obj.email=studentsInfo[attributes].email,
              obj.session=studentsInfo[attributes].session
              studentInfo.push(obj);
              studentInfo.sort((a,b)=>(a.registration_num>b.registration_num)?1:((b.registration_num>a.registration_num)?-1:0))
              this.setState({
                studentInfo:studentInfo
              });
              if(studentInfo.length===0){
                alert("No student found for your search.")
              }
              else{
                this.props.navigation.navigate("AllStudents",{
                  studentInfo:this.state.studentInfo
                })
              }
              
            }
          }
        }
      });
  };
  searchStudentEmail = () => {
    Firebase.database().ref("students").orderByChild("email").equalTo(this.state.email).once("value").then(snapshot =>{
        let studentInfo = snapshot.val();
        let name = null;
        let department = null;
        let mobile = null;
        let email = null;
        let reg_no = null;
        let imageUrl = null;
        let sem = null;
        let session= null;
        let year=null;
        for(var attributes in studentInfo){
            name = studentInfo[attributes].name;
            department = studentInfo[attributes].department;
            mobile = studentInfo[attributes].mobile;
            email = studentInfo[attributes].email;
            reg_no= studentInfo[attributes].registration_num
            sem = studentInfo[attributes].semester
            imageUrl =studentInfo[attributes].image;
            year =studentInfo[attributes].year;
            session =studentInfo[attributes].session;
        }
        this.setState({
          name: name,
          department: department,
          mobile: mobile,
          email: email,
          reg_no: reg_no,
          imageUrl: imageUrl,
          sem : sem,
          session:session,
          year:year
        });
        if(this.state.reg_no===undefined||this.state.reg_no===null){
          alert("No student found for your search")
        }
        else{
          this.props.navigation.navigate("StudentDetail", {
            email:this.state.email,
            name:this.state.name,
            department:this.state.department,
            mobile:this.state.mobile,
            reg_no:this.state.reg_no,
            imageUrl:this.state.imageUrl,
            sem:this.state.sem,
            year:this.state.year,
            session:this.state.session
          });
        }
        
    }
      
      
      )
}
    render() {
    
    return (
      <SafeAreaView style={styles.container}>
      
        <Separator/>
        <Text style={styles.welcomeUser}>
          Search Student using Registration No.
        </Text>
          <View style={styles.fixToText}>
          <View style={styles.inputContainer}>
        <TextInput
                  style={styles.inputs}
                  
                  placeholder="Reg No."
                  underlineColorAndroid="transparent"
                  onChangeText={reg_no => this.setState({ reg_no })}
        />
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.searchStudent()}
          >
            <Text style={styles.clickText}>Search</Text>
          </TouchableHighlight>
          </View>
        </View>
        <Separator/>
        <Text style={styles.welcomeUser}>
          Search Student using Email address
        </Text>
        
        <View style={styles.fixToText}>
        <View style={styles.inputContainer}>
        <TextInput
                  caretHidden
                  style={styles.inputs}
                  placeholder="Email "
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={email=> this.setState({ email })}
        />
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.searchStudentEmail()}
          >
            <Text style={styles.clickText}>Search</Text>
          </TouchableHighlight>
          </View>
        </View>
        <Separator/>
        <Text style={styles.welcomeUser}>
          Search Student using Department
        </Text>
        <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/semester.png")}
            />
            <Picker
              selectedValue={this.state.sem}
              style={{ height: 50, width: "80%", marginLeft: "5%" }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ sem: itemValue })
              }
            >
              <Picker.Item label="Select Semester" value="semester" />
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
          <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../images/department.jpg")}
          />

          <Picker
            selectedValue={this.state.department}
            style={{ height: 50, width: "80%", marginLeft: "5%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ department: itemValue })
            }
          >
            <Picker.Item label="Select Department" value="department" />
            <Picker.Item
              label="Civil Engineering"
              value="Civil Engineering"
            />
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
        <TouchableHighlight
            style={[styles.buttonContainer1, styles.clickButton]}
            onPress={() => this.showStudents()}
          >
            <Text style={styles.clickText}>Search</Text>
          </TouchableHighlight>
        <Separator/>
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
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: "5%",
    paddingBottom:"5%",
    fontWeight: "600",
    color: "#09C5F7"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  buttonContainer: {
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "40%",
    borderRadius: 20,
    marginTop: 20,
    paddingLeft:"10%"
    
  },
  buttonContainer1: {
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "40%",
    borderRadius: 20,
    marginTop: 20,
    paddingLeft:"16%",
    marginLeft:"30%"
    
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
    justifyContent: "space-around",
    height: "8%",
    width: 300,
    
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
    marginVertical: "2%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputContainer:{
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: "35%",
    justifyContent: "center"
  },
});
