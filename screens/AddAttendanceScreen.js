import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import { RadioButton } from "react-native-paper";

export default class AddAttendanceScreen extends React.Component {
  state = {
    checked: ""
  };
  state = {
    checkedabs: ""
  };

  render() {
    const { navigation } = this.props;
    const department = navigation.getParam("department");
    const semester = navigation.getParam("semester");
    const subject = navigation.getParam("subject");
    const date = navigation.getParam("date");
    const { checked } = this.state;
    const { checkedabs } = this.state;

    return (
      <View>
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
        <ScrollView>
          <View style={styles.fixTotext}>
            <Text style={styles.regText}>Registration No.</Text>

            <Text style={styles.preText}>Present</Text>
            <Text style={styles.absText}>Absent</Text>
          </View>
          <View style={styles.fixTotext}>
            <Text style={styles.regNo}>16105129001</Text>

            <RadioButton
              style={styles.preText}
              value="present"
              status={checked === "present" ? "checked" : "unchecked"}
              onPress={() => {
                this.setState({ checked: "present" });
              }}
            />
            <RadioButton
              style={styles.absText}
              value="absent"
              status={checked === "absent" ? "checked" : "unchecked"}
              onPress={() => {
                this.setState({ checked: "absent" });
              }}
            />
          </View>
          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1
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
    justifyContent: "space-between",
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
