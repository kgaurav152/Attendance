import React, { Component } from "react";
import Firebase from '../components/config'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Picker,
  TouchableHighlight,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import DatePicker from "react-native-datepicker";
function Separator() {
  return <View style={styles.separator} />;
}

export default class RequestLeaveScreen extends Component {
    
  state ={startdate:"",leaveType:"",endDate:""}
  updateleaveType = leaveType => {
    this.setState({ leaveType: leaveType });
  };
  requestLeave = (startDate,endDate,leaveType,name,casualLeave,dutyLeave) => {
    var currentDate = moment().format("YYYY-MM-DD")
      Firebase.database().ref("Request/").push({
          startDate: startDate,
          endDate: endDate,
          leaveType: leaveType,
          name: name,
          requestDate: currentDate,
          casualLeaveLeft: casualLeave,
          dutyLeaveLeft: dutyLeave
      })
      this.props.navigation.goBack();
  }



  render() {
   
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const department = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const casualLeave = navigation.getParam("casualLeave");
    const dutyLeave = navigation.getParam("dutyLeave")
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

        <View style={styles.container}>
        <View style={styles.fixDate}>
        <View style={styles.fixSize}>
          <DatePicker
            format="YYYY-MM-DD"
            date={this.state.startDate}
            onDateChange={startDate => {
              this.setState({ startDate: startDate });
            }}
          />
        </View>
        <View style={styles.fixSize}>
          <DatePicker
            format="YYYY-MM-DD"
            date={this.state.endDate}
            onDateChange={endDate => {
              this.setState({ endDate: endDate });
            }}
          />
        </View>
        </View>
        <View>
          <Picker
            selectedValue={this.state.leaveType}
            style={{ height: 50, width: 220, marginLeft: "24%" }}
            onValueChange={this.updateleaveType}
          >
            <Picker.Item label="Select type of leave" value="1" />
            <Picker.Item label="Casual Leave" value="CL" />
            <Picker.Item
              label="Duty Leave"
              value="DL"
            />
            
          </Picker>
        </View>
        <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.requestLeave(this.state.startDate,this.state.endDate,this.state.leaveType,name,casualLeave,dutyLeave)}
              >
                <Text style={styles.loginText}>Request Leave</Text>
              </TouchableHighlight>
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
  fixSize: {
    justifyContent: "center",
    flexDirection: "row"
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
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
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
