import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Card } from "react-native-elements";
import UpdateAttendanceBoxes from "../components/UpdateAttendanceBoxes";
import Firebase from "../components/config";
import { FlatList } from "react-native-gesture-handler";
export default class EditAttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regNoList: [],
      semester: "",
      department: "",
      subject: "",
      date: "",
      attendanceListMap: [],
      uid: "",
    };
  }
  componentDidMount() {
    let attendanceListMap = new Map();
    const { navigation } = this.props;
    const department = navigation.getParam("department");
    const semester = navigation.getParam("semester");
    const subject = navigation.getParam("subject");
    const date = navigation.getParam("date");
    const uid = navigation.getParam("uid");

    this.setState({
      date: date,
      department: department,
      semester: semester,
      subject: subject,
      uid: uid,
    });
  }

  render() {
    let attendanceListMap = new Map();
    const { navigation } = this.props;
    const attendanceList = navigation.getParam("attendanceList");
    const uid = navigation.getParam("uid");
    Object.keys(attendanceList).forEach((key) => {
      attendanceListMap.set(key, attendanceList[key]);
    });

    return (
      <ScrollView>
        <Card
          title="Update Attendance"
          titleStyle={{
            color: "#3498db",
            textAlign: "center",
            paddingLeft: 10,
            fontSize: 15,
            fontWeight: "800",
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>
                Department :{" "}
                {JSON.stringify(this.state.department).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                Subject :{" "}
                {JSON.stringify(this.state.subject).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                semester :{" "}
                {JSON.stringify(this.state.semester).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                Date : {JSON.stringify(this.state.date).replace(/\"/g, "")}
              </Text>
            </View>
          </View>
        </Card>

        <UpdateAttendanceBoxes
          data={attendanceList}
          dept={this.state.department}
          sem={this.state.semester}
          sub={this.state.subject}
          date={this.state.date}
          uid={uid}
          navigation={navigation}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1,
  },
  ButtonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#009688",
    borderRadius: 5,
    marginBottom: 20,
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
  },
  regText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 6,
  },
  fixTotext: {
    justifyContent: "center",
    flexDirection: "row",
  },
  preText: {
    fontWeight: "900",
    color: "green",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 6,
  },
  absText: {
    fontWeight: "900",
    color: "red",
    marginRight: 8,
    fontSize: 18,
    marginTop: 20,
    marginLeft: 6,
  },
  regNo: {
    fontWeight: "400",
    color: "black",
    fontSize: 18,
    marginTop: 4,
    marginLeft: 7,
  },
});
