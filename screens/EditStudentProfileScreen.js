import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Image,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from 'expo-constants';
import Firebase from "../components/config";

export default class EditStudentProfile extends Component {
  
    state = {
      email: "",
      name: "",
      department: "",
      errorMessage: null,
      image: null,
      semester: "",
      session: "",
      year: "",
      mobile: "",
      registration_num: ""
    };
  
  
  writeStudentData=()=> {
    
      Firebase.database()
        .ref("students/")
        .orderByChild("email")
        .equalTo(this.state.email)
        .once("value")
        .then(res=>{
          res.forEach(record=>{
            Firebase.database()
            .ref("students/"+record.key)
            .update({
              name: this.state.name,
              department: this.state.department,
              image: this.state.image,
              session: this.state.session,
              semester: this.state.semester,
              mobile: this.state.mobile,
              year: this.state.year,
              registration_num: this.state.registration_num,
              email:this.state.email
              
            })
            .catch(function(error) {
              console.log("Wrong Choice");
              console.log(error);
            });
            this.props.navigation.navigate("FacultyWelcome")         })
        })
  }
  componentDidMount(){
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const department = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
    const semester = navigation.getParam("sem");
    const registration_num = navigation.getParam("reg_no");
    const session = navigation.getParam("session");
    const year = navigation.getParam("year");
    this.setState({
      email:email,
      name:name,
      department:department,
      mobile:mobile,
      semester:semester,
      registration_num:registration_num,
      session:session,
      year:year
    })
  }
  render() {
    let { image } = this.state;
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/name.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/reg.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Registration no."
              keyboardType='default'
              underlineColorAndroid="transparent"
              onChangeText={registration_num => this.setState({ registration_num })}
              value={this.state.registration_num}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/department.jpg")}
            />
            
            <Picker
          selectedValue={this.state.department}
          style={{ height: 50, width: 180, marginLeft:"5%"}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ department: itemValue })
          }
        >
          <Picker.Item label="Select Department" value="department" />
          <Picker.Item label="Civil Engineering" value="Civil Engineering" />
          <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
          <Picker.Item label="Computer Sc. & Engineering" value="Computer Sc. & Engineering" />
        </Picker>  
        </View>       
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/semester.png")}
            />
            <Picker
            selectedValue={this.state.semester}
            style={{ height: 50, width: 180, marginLeft:"5%"}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ semester: itemValue })
            }
          >
            <Picker.Item label="Select Semester" value="semester" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />            
            <Picker.Item label="6" value="6" />            
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />            
          </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/year.jpg")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Year"
              underlineColorAndroid="transparent"
              onChangeText={year => this.setState({ year })}
              value={this.state.year}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/sessions.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Session"
              underlineColorAndroid="transparent"
              onChangeText={session => this.setState({ session })}
              value={this.state.session}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/mailIcon.jpg")}
            />
            <TextInput
            caretHidden
              style={styles.inputs}
              placeholder="email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              editable={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/mobile.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Mobile"
              keyboardType='numeric'
              underlineColorAndroid="transparent"
              onChangeText={mobile => this.setState({ mobile })}
              value={this.state.mobile}
            />
          </View>
          
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.writeStudentData()}
          >
            <Text style={styles.clickText}>Update Student</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
  

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginLeft: 45,
    paddingBottom: 20
  },
  inputContainer: {
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 15
  },
  clickButton: {
    backgroundColor: "#00b5ec"
  },
  imageChooseButtonContainer: {
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 10,
    marginRight: 15,
    marginTop: 20
  },
  imageChooseclickButton: {
    backgroundColor: "#a0522d"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  },
  studentDetail: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#d2691e"
  }
});
