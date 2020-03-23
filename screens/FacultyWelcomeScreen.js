import React, { Component } from "react";
import Firebase from '../components/config'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
function Separator() {
  return <View style={styles.separator} />;
}

export default class FacultyWelcomeScreen extends Component {
  
  
  
  componentDidMount(){
     AsyncStorage.getItem('attendanceList').then( list => {
          let attendances = JSON.parse(list);
          for(var i = attendances.length -1; i >= 0 ; i--){

            let obj = attendances[i];
            obj = JSON.parse(obj);
            Firebase.database()
            .ref("attendance/")
            .push(obj)
          .then( res=> {
              attendances.splice(i,1);
            })
            .catch( error => {
                          
            });
       }
    })
}

  render() {
   
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const department = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
      return (
      
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
        <Card
          title={name}
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
              <Text style={styles.paragraph}>{department}</Text>
              <Text style={styles.paragraph}>{mobile}</Text>
              <Text style={styles.paragraph}>{email}</Text>
            </View>
            <Image
              source={{uri:imageUrl}}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>

        <View style={styles.fixToText}>
          <LinearGradient
            colors={["#a13388", "#10356c"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.buttonContainer]}
          >
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Attendance",{
                email,
                department,
                name,
                mobile,
                imageUrl
              })}
            >
              <Text style={styles.clickText}>Attendance</Text>
            </TouchableHighlight>
            </LinearGradient>
            <LinearGradient
            colors={["#a13388", "#10356c"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.buttonContainer]}
          >
            <TouchableHighlight
              
              onPress={() => this.props.navigation.navigate("AddStudents")}
            >
              <Text style={styles.clickText}>Student</Text>
            </TouchableHighlight>
            </LinearGradient>
          
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <LinearGradient
            colors={["#a13388", "#10356c"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.buttonContainer]}
          >
            <TouchableHighlight onPress={() => this.props.navigation.navigate("AttendanceInfo")}>
              <Text style={styles.clickText}>Report</Text>
            </TouchableHighlight>
          </LinearGradient>
          <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.buttonContainer]}
        >
          <TouchableHighlight
            
            onPress={() => this.props.navigation.navigate("SearchStudent")}
          >
            <Text style={styles.clickText}>Student Detail</Text>
          </TouchableHighlight>
          </LinearGradient>
        </View>
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
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
  },
  buttonContainer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15
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
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
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
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
