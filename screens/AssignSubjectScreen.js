import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Picker,
  Image
} from "react-native";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
export default class AssignSubject extends Component {
  state = {
    email: "",
    selectedSubject: "",
    subjectList: [],
    semester: "",
    department: ""
  };
  hideAlert = () => {
    this.setState({
      emailAlert: false,
      departmentAlert:false
    });
  };
  emailAlert = () => {
    this.setState({
      emailAlert: true,
      
    });
  };
  departmentAlert = () => {
    this.setState({
      departmentAlert: true,
      
    });
  };

  assignSubject = () => {
    if(this.state.email !=''){
      if(this.state.department!='1'){
      Firebase.database()
      .ref("Faculty/")
      .orderByChild("email")
      .equalTo(this.state.email)
      .once("value")
      .then(res => {
        res.forEach(record => {
          Firebase.database()
            .ref("Faculty/" + record.key + "/Subject/")
            .push({
              subjectName: this.state.selectedSubject,
              subjectSem: this.state.semester
            })
            .catch(function(error) {
              console.log("Wrong Choice");
              console.log(error);
            });
        });
      });
    }
    else{
      this.departmentAlert();
    }
  }
  else{
    this.emailAlert();
  }
  
  };
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextState.email != this.state.email ||
      nextState.department != this.state.department ||
      nextState.semester != this.state.semester
    ) {
      console.log("Component did mound is being callled...");
      var subjectList = [];
      Firebase.database()
        .ref("Subjects")
        .once("value")
        .then(snapshot => {
          var subjectInfo = snapshot.val();
          var db_department = "";
          var db_semester = "";
          for (var attributes in subjectInfo) {
            db_department = subjectInfo[attributes].department;
            db_semester = subjectInfo[attributes].semester;
            if (db_department === this.state.department) {
              if (db_semester === this.state.semester) {
                var subjectData = subjectInfo[attributes].subjectName;
                subjectList.push(subjectData);
              }
              console.log(subjectList);
    
            this.setState({
              subjectList: subjectList
            });
            }
          }
        });
    }
  }

  render() {
    let subjectItems = this.state.subjectList.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    const { emailAlert,departmentAlert } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
          caretHidden
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            require
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../images/department.jpg")}
          />

          <Picker
            selectedValue={this.state.department}
            style={{ height: 50, width: 180, marginLeft: "5%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ department: itemValue })
            }
          >
            <Picker.Item label="Department" value="1" />
            <Picker.Item label="Civil Engineering" value="Civil Engineering" />
            <Picker.Item
              label="Mechanical Engineering"
              value="Mechanical Engineering"
            />
            <Picker.Item
              label="Computer Sc. & Engineering"
              value="Computer Sc. & Engineering"
            />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../images/semester.png")}
          />
          <Picker
            selectedValue={this.state.semester}
            style={{ height: 50, width: 180, marginLeft: "5%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ semester: itemValue })
            }
          >
            <Picker.Item label="Select Semester" value="1" />
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

        <View>
          <Picker
            selectedValue={this.state.selectedSubject}
            style={{ height: 50, width: 180, marginLeft: "10%" }}
            onValueChange={subjectLists =>
              this.setState({ selectedSubject: subjectLists })
            }
          >
            <Picker.Item label="Choose Subject" value="1" />

            {subjectItems}
          </Picker>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.registerButton]}
          onPress={() => this.assignSubject()}
        >
          <Text style={styles.registerText}>Assign</Text>
        </TouchableHighlight>
        <AwesomeAlert
          show={emailAlert}
          showProgress={false}
          title="Oops !"
          message="Please fill out the Email field"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          //cancelText="No, cancel"
          confirmText="OK !"
          contentContainerStyle={{
            backgroundColor: "white"
          }}
          confirmButtonColor="#10356c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <AwesomeAlert
          show={departmentAlert}
          showProgress={false}
          title="Oops !"
          message="Please Choose Department"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          //cancelText="No, cancel"
          confirmText="OK !"
          contentContainerStyle={{
            backgroundColor: "white"
          }}
          confirmButtonColor="#10356c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  fixTotext: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "#87ceeb",
    fontWeight: "800"
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
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
  registerButton: {
    backgroundColor: "#00b5ec",
    marginTop: 30
  },
  registerText: {
    color: "white"
  },

  loginButton: {
    marginLeft: 22,
    fontWeight: "900",
    color: "#D16713",
    fontSize: 17
  },
  loginText: {
    textAlign: "center",
    fontWeight: "900",
    color: "#D16713",
    fontSize: 17,
    marginLeft: 12
  }
});
