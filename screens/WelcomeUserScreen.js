import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
        <Card
          title="Md TALIB AHMAD"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15,

            fontWeight: "800"
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>Assistant Prof.</Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 9108006551</Text>
              <Text style={styles.paragraph}>mdtalibahmad@gmail.com</Text>
            </View>
            <Image
              source={require("../assets/mta.jpg")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
        <ScrollView>
        <View style={styles.fixTotext}>
          <Text style={styles.headText}>To Make Attendnace</Text>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("WelcomeUser")}
          >
            <Text style={styles.clickText}>Click Here</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.fixTotext}>
          <Text style={styles.headText}>Generate Daily Report</Text>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("WelcomeUser")}
          >
            <Text style={styles.clickText}>Click Here</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.fixTotext}>
          <Text style={styles.headText}>Generate Monthly Report</Text>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("WelcomeUser")}
          >
            <Text style={styles.clickText}>Click Here</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.fixTotext}>
          <Text style={styles.headText}>Add Student details</Text>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("AddStudents")}
          >
            <Text style={styles.clickText}>Click Here</Text>
          </TouchableHighlight>
        </View>
        
        <View style={styles.fixTotext}>
          <Text style={styles.headText}>View Student details</Text>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate("AddStudents")}
          >
            <Text style={styles.clickText}>Click Here</Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
      </View>
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
    paddingTop: 30,
    fontWeight: "600",
    color: "#d2691e"
  },
  buttonContainer: {
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 15
  },
  clickButton: {
    backgroundColor: "#00b5ec"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  },
  fixTotext: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  headText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 14
  }
});
