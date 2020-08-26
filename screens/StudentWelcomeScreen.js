import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
import {downLoadProfileImage, uploadGalleryImage } from '../utils/UploadImage';
function Separator() {
  return <View style={styles.separator} />;
}

export default class StudentWelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ""
    }
    
  }
  componentDidMount() {

    const { navigation } = this.props;
    const email = navigation.getParam("email");
    this.focusListener = navigation.addListener("didFocus", () => {
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
    const reg_no = navigation.getParam("reg_no");
    const mobile = navigation.getParam("mobile");
    const department = navigation.getParam("department");
    
  const sem = navigation.getParam("sem");
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
              <Text style={styles.paragraph}>
                Reg. No - {JSON.stringify(reg_no).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                {JSON.stringify(department).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                {JSON.stringify(mobile).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                {JSON.stringify(email).replace(/\"/g, "")}
           </Text>
           </View>
           {this.state.imageUrl=="" ? (
            <TouchableHighlight onPress={() => this.showImageAlert()}>
            <Image
              source={require("../images/people.png")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
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
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() =>
              this.props.navigation.navigate("StudentAttendance", {
                email,
                reg_no,
                department,
                sem
              })
            }
          >
            <Text style={styles.clickText}>Attendance</Text>
          </TouchableHighlight>
         {/* <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
          onPress={()=>this.props.navigation.navigate("StudentProfile",{
              email,
              name,
              mobile,
              imageUrl,
              reg_no,
              department,
              sem
            })}
          >
            <Text style={styles.clickText}>My Profile</Text>
          </TouchableHighlight>*/}
        </View>
        <Separator />
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
