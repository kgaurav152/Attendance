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
  }

  componentDidMount() {
    studentList: [], this.setState({ studentList: this.props.data });
  }
  

  render() {
    return (
      <ScrollView>
        <FlatList
          marginLeft="3%"
          numColumns={4}
          data={this.state.studentList}
          renderItem={({ item }) => <AttendanceBox id={item} />}
        />
      </ScrollView>
    );
  }
}

export default AttendanceBoxes;
