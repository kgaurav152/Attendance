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
  constructor(props) {
    super();
    this.state = {
      email: "",
      name: "",
      department: "",
      errorMessage: null,
      image: null,
      semester: "",
      session: "",
      year: "",
      mobile: "",
      reg_no: ""
    };
  }
  
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
            .set({
              name: this.state.name,
              department: this.state.department,
              image: this.state.image,
              session: this.state.session,
              semester: this.state.semester,
              mobile: this.state.mobile,
              year: this.state.year,
              registration_num: this.state.reg_no,
              
            })
            .catch(function(error) {
              console.log("Wrong Choice");
              console.log(error);
            });
            this.props.navigation.navigate("FacultyWelcome")         })
        })
       
        componentDidMount=()=>{
          const { navigation } = this.props;
          const email = navigation.getParam("email");
          const name = navigation.getParam("name");
          const department = navigation.getParam("department");
          const mobile = navigation.getParam("mobile");
          const imageUrl = navigation.getParam("imageUrl");
          this.setState({
            email:email,
            name:name,
            department:department
          })
        }
        
    
  
    
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
              onChangeText={reg_no => this.setState({ reg_no })}
              value={this.state.reg_no}
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
            <Picker.Item label="1st" value="1st" />
            <Picker.Item label="2nd" value="2nd" />
            <Picker.Item label="3rd" value="3rd" />
            <Picker.Item label="4th" value="4th" />
            <Picker.Item label="5th" value="5th" />            
            <Picker.Item label="6th" value="6th" />            
            <Picker.Item label="7th" value="7th" />
            <Picker.Item label="8th" value="8th" />            
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableHighlight
              style={[
                styles.imageChooseButtonContainer,
                styles.imageChooseclickButton
              ]}
              onPress={this._pickImage}
            >
              <Text style={styles.clickText}>Choose Photo</Text>
            </TouchableHighlight>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 50,
                  borderRadius: 100 / 2
                }}
              />
            )}
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.writeStudentData()}
          >
            <Text style={styles.clickText}>Add Student</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
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
