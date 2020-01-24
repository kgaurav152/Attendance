import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Button
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
    this.setState({department: this.props.department})
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
              .ref("attendance/"+record.key+"/date/")
              .set({
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
        <Button
        title="Submit"
        marginTop="5%"
        color="#f194ff"
        onPress={() => this.submitHandler()}/>
      </ScrollView>
    );
  }
}

export default AttendanceBoxes;