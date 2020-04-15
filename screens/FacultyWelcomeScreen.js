import React, { Component } from "react";
import Firebase from '../components/config';
import {downLoadProfileImage, uploadGalleryImage } from '../utils/UploadImage';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import 'firebase/storage';
import AwesomeAlert from "react-native-awesome-alerts";

function Separator() {
  return <View style={styles.separator} />;
}

export default class FacultyWelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ""
    }
    
  }

  clearPendingAttendance = () => {
    AsyncStorage.getItem('attendanceList').then(list => {
      let attendances = JSON.parse(list);
      for (var i = attendances.length - 1; i >= 0; i--) {

        let obj = attendances[i];
        Firebase.database()
          .ref("attendance/")
          .push(obj)
          .then(res => {
            attendances.splice(i, 1);
            list = attendances;
            if (attendances.length <= 0) {
              AsyncStorage.removeItem("attendanceList");
            }
          })
          .catch(error => {
            console.log("FacultyWelcome Screen " + error);
            list = attendances
          });
      }
    }).catch(error => {
      console.log("Error " + error);
    })
  }

  
  componentDidMount() {

    const { navigation } = this.props;
    const email = navigation.getParam("email");
    this.focusListener = navigation.addListener("didFocus", () => {
      this.clearPendingAttendance();
      downLoadProfileImage(email).then( uri => 
        this.setState({ imageUrl:uri }));
    });

  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  uploadImage = async (email) => {    
     let image = await uploadGalleryImage("profileImage/", email);
     let imagePath = image;
     this.setState({
       imageUrl: imagePath,
       imageAlert:false
     })
  }
  hideImageAlert=()=>{
    this.setState({
      imageAlert:false
    })
  }
  showImageAlert=()=>{
    this.setState({
      imageAlert:true
    })
  }

  render() {
    const {imageAlert}=this.state;
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const department = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
    const facultyDepartment = navigation.getParam("facultyDepartment")
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
              <Text style={styles.paragraph}>{facultyDepartment}</Text>
              <Text style={styles.paragraph}>{mobile}</Text>
              <Text style={styles.paragraph}>{email}</Text>
            </View>
            {this.state.imageUrl=="" ? (
              
            <TouchableHighlight onPress={() => this.showImageAlert()}>
            
            <Image
              source={require("../images/people.png")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2,
                
              }}
            />
          </TouchableHighlight>
              ):
            <TouchableHighlight onPress={() => this.showImageAlert()}>
            <Image
              source={{ uri: this.state.imageUrl }}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
            </TouchableHighlight>
            }
            <AwesomeAlert
            show={imageAlert}
            showProgress={false}
            title="Upload"
            message=" Profile Photo"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
             cancelText="No, cancel"
            confirmText="Choose Photo"
            contentContainerStyle={{
              backgroundColor: "white",
              
            }}
            confirmButtonColor="#10356c"
            onCancelPressed={() => {
              this.hideImageAlert();
            }}
            onConfirmPressed={() => {
              this.uploadImage(email);
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
              onPress={() => this.props.navigation.navigate("Attendance", {
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

              onPress={() => this.props.navigation.navigate("SearchStudent") }
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
