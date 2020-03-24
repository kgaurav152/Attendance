import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";

export default class AboutAppScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
            >
              <Text style={styles.loginText}>About App</Text>
            </TouchableHighlight>

            <Text style={styles.description}>
              Keeping in mind the undesirable use of paper in taking attendance,
              the developer team has decided to bring the whole process into an
              app based system. The latest Online Attendance System has the
              facility to take attendance of students, and project the
              attendance report in either of the ways available. The team has
              worked on the App using the latest technology such as React native
              in frontend and Google Firebase in backend.
            </Text>
            <Text style={styles.descriptionDesc}>
              The Homepage consists of following options which then navigates to
              respective screen:
            </Text>
            <Text style={styles.descriptionLeft}>1. Login</Text>
            <Text style={styles.descriptionLeft}>2. KEC Katihar</Text>
            <Text style={styles.descriptionLeft}>
              3. Developer's Information
            </Text>
            <Text style={styles.descriptionLeft}>4. About App.</Text>

            <Text style={styles.descriptionDesc}>
              The Login screen then navigates according to the role of user.{" "}
            </Text>

            <Text style={styles.descriptionDesc}>
              The Faculty has access to following screen:
            </Text>
            <Text style={styles.descriptionLeft}>1. Take Attendance</Text>
            <Text style={styles.descriptionLeft}>
              2. Generate Attendance Report
            </Text>
            <Text style={styles.descriptionLeft}>3. Add Students</Text>
            <Text style={styles.descriptionLeft}>4. Student Details</Text>

            <Text style={styles.descriptionDesc}>
              A Student can access following screens.
            </Text>
            <Text style={styles.descriptionLeft}>
              1. Generate own Attendance Report
            </Text>
            <Text style={styles.descriptionLeft}>2. Edit own Profile</Text>
            <Text style={styles.descriptionDesc}>
              An Admin can access following screens.
            </Text>
            <Text style={styles.descriptionLeft}>1. Add Subjects</Text>
            <Text style={styles.descriptionLeft}>
              2. Assign Subjects to Faculty
            </Text>
            <Text style={styles.descriptionLeft}>3. Add a User</Text>
            <Text style={styles.descriptionLeft}>4. Generate Report</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00CED1"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },

  title: {
    fontSize: 20,
    color: "#00CED1"
  },
  count: {
    fontSize: 18
  },
  bodyContent: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    padding: 10,
    marginTop: 10
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    marginLeft: "15%",
    borderRadius: 30,
    backgroundColor: "#00CED1"
  },
  description: {
    fontSize: 15,
    color: "#00CED1",
    marginTop: 5,
    textAlign: "justify"
  },
  descriptionDesc: {
    fontSize: 15,
    color: "#00CED1",
    marginTop: 5,
    textAlign: "justify",
    fontWeight: "900"
  },
  descriptionLeft: {
    fontSize: 15,
    color: "#00CED1",
    marginTop: 5,
    textAlign: "left",
    justifyContent: "center"
  }
});
