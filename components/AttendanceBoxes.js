import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  FlatList
} from "react-native";
import AttendanceBox from "./AttendanceBox";
import { ScrollView } from "react-native-gesture-handler";

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
    studentList: [], this.setState({ studentList: this.props.data });
  }

  addPresentStudent( regNo){
    console.log("add Registration is being called.")
    const { attendanceList } = this.state;
    attendanceList[regNo] = true;
    this.setState({
        attendanceList : attendanceList
        }, () =>{
          console.log(this.state.attendanceList);
        }
    )
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
      </ScrollView>
    );
  }
}

export default AttendanceBoxes;
