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
  editStudentData() {
    
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
              
              image: this.state.image,
              session: this.state.session,
              
              mobile: this.state.mobile,
              
              registration_num: this.state.reg_no,
              email: this.state.email
            })
            .catch(function(error) {
              console.log("Wrong Choice");
              console.log(error);
            });
            this.props.navigation.navigate('StudentWelcome')          })
        })
        
    
      
    
  }
  render() {
    let { image } = this.state;
    const { navigation } = this.props;
    const  email =navigation.getParam("email");
    const name = navigation.getParam("name");
    const reg_no = navigation.getParam("reg_no");
    const mobile = navigation.getParam("mobile");
    const department = navigation.getParam("department");
    const imageUrl = navigation.getParam("imageUrl");
    const sem = navigation.getParam("sem");
    this.setState({
      reg_no:reg_no
    })
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
              placeholder={JSON.stringify(name).replace(/\"/g, "")}
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
              placeholder={JSON.stringify(reg_no).replace(/\"/g, "")}
              keyboardType='default'
              underlineColorAndroid="transparent"
              onChangeText={reg_no => this.setState({ reg_no })}
              value={JSON.stringify(reg_no).replace(/\"/g, "")}
              editable={false}
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
              placeholder={JSON.stringify(email).replace(/\"/g, "")}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/mobile.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder={JSON.stringify(mobile).replace(/\"/g, "")}
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
            onPress={() => this.editStudentData()}
          >
            <Text style={styles.clickText}>Submit</Text>
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
