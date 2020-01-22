import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  StatusBar,
  Image
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import AttendanceBoxes from "../components/AttendanceBoxes";

export default class AddAttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "008",
        "009",
        "010",
        "011",
        "012",
        "013",
        "014",
        "015",
        "016",
        "017",
        "018",
        "019",
        "020",
        "021",
        "022",
        "023",
        "024",
        "025",
        "026",
        "027",
        "028"
      ]
    };
  }

  render() {
    const { navigation } = this.props;
    const department = navigation.getParam("department");
    const semester = navigation.getParam("semester");
    const subject = navigation.getParam("subject");
    const date = navigation.getParam("date");

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
                Department : {JSON.stringify(department)}
              </Text>
              <Text style={styles.paragraph}>
                Subject : {JSON.stringify(subject)}
              </Text>
              <Text style={styles.paragraph}>
                semester : {JSON.stringify(semester)}
              </Text>
              <Text style={styles.paragraph}>
                Date : {JSON.stringify(date)}
              </Text>
            </View>
          </View>
        </Card>
        
        {<AttendanceBoxes data={this.state.data} />}
        
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
