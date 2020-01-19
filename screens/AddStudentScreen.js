import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Image,
  TouchableHighlight
} from "react-native";
//import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class AddStudent extends Component {
  state = {
    email: "",
    name: "",
    department: "",
    errorMessage: null,
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
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
          <TextInput
            style={styles.inputs}
            placeholder="Department"
            keyboardType="autoCapitalizie"
            underlineColorAndroid="transparent"
            onChangeText={department => this.setState({ department })}
            value={this.state.department}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../images/semester.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Semester"
            underlineColorAndroid="transparent"
            onChangeText={semester => this.setState({ semester})}
            value={this.state.semester}
          />
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
            placeholder="Email"
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
            placeholder="Mobile"
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
              style={{ width: 100, height: 100, marginLeft: 50, borderRadius:100/2}}
            />
          )}
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() => this.onClickListener("login")}
        >
          <Text style={styles.clickText}>Add Student</Text>
        </TouchableHighlight>
      </ScrollView>
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

  /*_pickImage = async () => {
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
  };*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
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
    width:300,
    borderRadius: 10,
    marginTop: 50,
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
    marginTop:40
  },
  imageChooseclickButton: {
    backgroundColor: "#a0522d"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  }
});
