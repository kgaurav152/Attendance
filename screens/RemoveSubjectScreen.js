import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
import Firebase from "../components/config";
import AwesomeAlert from "react-native-awesome-alerts";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
class RemoveSubjectScreen extends Component {
  state = {
    department: "",
    semester: "",
    subject: "",
    selectedSubject: "",
    subjectData: [],
    uid:"",
    subjectName:""
    
  };
  updateDepartment = department => {
    this.setState({ department: department });
  };
  updateSemester = semester => {
    this.setState({ semester: semester });
  }
  updateSubject = subject => {
    this.setState({ subject: subject });
  };
  
  
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      
      nextState.department != this.state.department ||
      nextState.semester != this.state.semester
    ) {
      console.log("Component did mound is being callled...");
      var subjectData = [];
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
                  let obj={};
                obj.subjectName = subjectInfo[attributes].subjectName;
                obj.semester=subjectInfo[attributes].semester,
                obj.department=subjectInfo[attributes].department,
                obj.subjectCode=subjectInfo[attributes].SubjectCode
                obj.uid=attributes
                subjectData.push(obj);
              }
             // console.log(subjectData);
    
            this.setState({
              subjectData: subjectData
            });
            }
          }
        });
    }
  }
renderSubject(item){
    return(
        <View>
        
        <Card>
        <View style={styles.fixImage}>
          <View>
            <Text style={styles.paragraph}>Subject Name - {item.subjectName}</Text>
            <Text style={styles.paragraph}>
              Subject Code -{item.subjectCode}
            </Text>
            <Text style={styles.paragraph}>Department - {item.department}</Text>
            <Text style={styles.paragraph}>Semester - {item.semester}</Text>
            
            
            
            <View style={styles.fixToText}>
            {/*<TouchableHighlight
              style={[styles.buttonContainer, styles.clickButton]}
              onPress={() =>
                this.props.navigation.navigate("EditSubject", {
                  
                  department: item.department,
                  semester: item.semester,
                  
                })
              }
            >
              <Text style={styles.clickText}>Edit Subject Detail</Text>
            </TouchableHighlight>*/}
            <TouchableHighlight
              style={[styles.buttonContainer, styles.clickButton]}
              onPress={() =>
                this.removeAlert(item)
              }
            >
              <Text style={styles.clickText}>Remove Subject</Text>
            </TouchableHighlight>
            </View>
            
          </View>
        </View>
      </Card>
        </View>
    )
}
removeAlert=(item)=>{
    this.setState({
        removeAlert:true,
        uid:item.uid,
        subjectName:item.subjectName
    })
}
hideAlert=()=>{
    this.setState({
        removeAlert:false,
        uid:"",
        subjectName:""
    })
}
removeSubject=()=>{
    Firebase.database().ref("Subjects/").child(this.state.uid).remove();
    alert("Subject Removed.")
    this.hideAlert();
}

  render() {
    let {removeAlert}=this.state;
    
    
    return (
      <View style={styles.container}>
      
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
            <FlatList
            data={this.state.subjectData}
                          
            renderItem={({ item }) => this.renderSubject(item)}
            />
            <AwesomeAlert
        show={removeAlert}
        showProgress={false}
        title="Remove Subject"
        message={this.state.subjectName}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="OK !"
        contentContainerStyle={{
          backgroundColor: "white",
          width:"160%"
        }}
        confirmButtonColor="#10356c"
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          this.removeSubject();
        }}
      />
      </View>
    );
  }
}
export default RemoveSubjectScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    fixImage: {
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    paragraph: {
      margin: 1.5,
      fontSize: 14,
      fontWeight: "700",
      paddingLeft: 12,
      color: "#008b8b",
    },
    welcomeUser: {
      textAlign: "center",
      fontSize: 18,
      paddingTop: 30,
      fontWeight: "600",
    },
    buttonContainer: {
      height: 25,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
  
      width: 150,
      borderRadius: 5,
      marginTop: 20,
      marginRight: 15,
    },
    buttonContainer1: {
      height: "10%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      width: "70%",
      borderRadius: 20,
      marginTop: 20,
      marginLeft: "4%",
    },
    clickButton: {
      backgroundColor: "#09C5F7",
    },
    clickText: {
      color: "white",
      fontWeight: "800",
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 40,
      width: 300,
      textAlign: "center",
      marginLeft: 15,
    },
    headText: {
      fontWeight: "900",
      color: "#f4a460",
      fontSize: 18,
      marginTop: 20,
      marginLeft: 14,
    },
    separator: {
      marginVertical: "3%",
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    paragraphName: {
      margin: 1.5,
      fontSize: 14,
      fontWeight: "700",
      paddingLeft: 12,
      color: "#008b8b",
      marginLeft: "2%",
    },
  });
  