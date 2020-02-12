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

export default class AssignSubject extends Component {
  state = { email: "", selectedSubject: "", subjectList: [], semester: "" , department: ""};

  assignSubject = () => {
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
  };
  componentDidUpdate( prevProps, prevState) {
    if( prevState.email != this.state.email || 
          prevState.department != this.state.department || 
          prevState.semester != this.state.semester ){
    console.log("Component did mound is being callled...");
    var subjectList = [];
    Firebase.database().ref("Subjects").once("value").then(snapshot =>{
      var subjectInfo = snapshot.val();
      var db_department = "";
      var db_semester ="";
      for(var attributes in subjectInfo)
    {
      
        db_department = subjectInfo[attributes].department
        db_semester = subjectInfo[attributes].semester
        if(db_department === this.state.department){
          if(db_semester === this.state.semester){
            Firebase.database()
          .ref("Subjects")
          .once("value")
          .then(snapshot => {
            snapshot.forEach(function(childSnapshot) {
              var subjectData = childSnapshot.val().subjectName;
              subjectList.push(subjectData);
             });
            console.log(subjectList);
    
            this.setState({
              subjectList: subjectList
            });
          });
          }
        }
    }
    
    })
    
    
    }
  }

  render() {
    let subjectItems = this.state.subjectList.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
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
            source={require("../images/department.jpg")}
          />

          <Picker
            selectedValue={this.state.department}
            style={{ height: 50, width: 180, marginLeft: "5%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ department: itemValue })
            }
          >
            <Picker.Item label="Department" value="department" />
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
            <Picker.Item label="Select Semester" value="Select Semester" />
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
