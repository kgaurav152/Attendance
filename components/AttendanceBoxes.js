import React, { Component } from "react";
import {
  
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  
} from "react-native";
import AttendanceBox from "./AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";
import Firebase from '../components/config'

var today = new Date();
date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();
console.log(date);
class AttendanceBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      attendanceList: new Map()
    };
    this.addPresentStudent = this.addPresentStudent.bind( this );
  }
  

  componentDidMount() {
    this.setState({ studentList: this.props.data});
    
  }

  addPresentStudent( regNo){
    console.log("add Registration is being called.")
    const { attendanceList } = this.state;
    attendanceList[regNo] = true;
    this.setState({
        attendanceList : attendanceList
        }, () =>{
          console.log(this.state.attendanceList);
          console.log(date)
        }
    )
  }
  submitHandler=()=>{
    Firebase.database()
        .ref("attendance/")
        .orderByChild("date")
        .equalTo(date)
        .once("value")
        .then(res=>{
          res.forEach(record=>{
              Firebase.database()
              .ref("attendance/"+record.key)
              .update({
                date:date,
                attendanceList:this.state.attendanceList
              })
          })
        })
  }  

 
  render() {
    return (
      <ScrollView>
        <FlatList
          marginLeft="3%"
          numColumns={4}
          data={this.state.studentList}
          renderItem={({ item }) => <AttendanceBox id={item} addRegNo={this.addPresentStudent }/>}
        />
        <TouchableHighlight
        style={[styles.buttonContainer, styles.clickButton]}
        onPress={() =>this.submitHandler()}
          
      >
        <Text style={styles.clickText}>Submit</Text>
      </TouchableHighlight>
      </ScrollView>
    );
  }
}
const styles =StyleSheet.create({
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
})

export default AttendanceBoxes;