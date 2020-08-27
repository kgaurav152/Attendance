import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import AwesomeAlert from "react-native-awesome-alerts";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import Firebase from "../components/config";
export default class Allstudents extends Component {
    state={registration_num:"",name:""}
    upgradeAlert = (item) => {
        this.setState({
          upgradeAlert: true,
          registration_num:item.registration_num,
          name:item.name
        });
      };
      hideAlert=()=>{
          this.setState({
              upgradeAlert:false
          })
      }
      upgradeSem = () => {
        Firebase.database()
          .ref("students")
          .orderByChild("registration_num")
          .equalTo(this.state.registration_num)
          .once("value")
          .then((res) => {
            var studentInfo =res.val();
            for(var attributes in studentInfo){
              var registration_num = studentInfo[attributes].registration_num
              var semester = studentInfo[attributes].semester
              let a =1+(+semester);
              var upgradeSem=a.toString();
              console.log(upgradeSem)
              
            }
            res.forEach(record => {
              
              Firebase.database()
                .ref("students/" + record.key)
                .update({
                  semester:upgradeSem
                });
                this.setState({
                    upgradeAlert:false
                })
                alert("Semester updated for Reg No - "+ registration_num);
                
            });
          });
      };
  renderStudentInfo = (item) => {
    return (
      <Card>
        <View style={styles.fixImage}>
          <View>
            <Text style={styles.paragraph}>Name - {item.name}</Text>
            <Text style={styles.paragraph}>
              Registration No. -{item.registration_num}
            </Text>
            <Text style={styles.paragraph}>Department - {item.department}</Text>
            <Text style={styles.paragraph}>Semester - {item.semester}</Text>
            <Text style={styles.paragraph}>Session - {item.session}</Text>
            <Text style={styles.paragraph}>Email - {item.email}</Text>
            <Text style={styles.paragraph}>Mobile - {item.mobile}</Text>
            <View style={styles.fixToText}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.clickButton]}
              onPress={() =>
                this.props.navigation.navigate("EditStudentProfile", {
                  email: item.email,
                  name: item.name,
                  mobile: item.mobile,
                  reg_no: item.registration_num,
                  department: item.department,
                  sem: item.semester,
                  session: item.session,
                  year: item.year,
                })
              }
            >
              <Text style={styles.clickText}>Edit Student Detail</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.clickButton]}
              onPress={() =>
                this.upgradeAlert(item)
              }
            >
              <Text style={styles.clickText}>Upgrade Semester</Text>
            </TouchableHighlight>
            </View>
            
          </View>
        </View>
      </Card>
    );
  };
  render() {
    let {upgradeAlert}=this.state;
    const { navigation } = this.props;
    const studentInfo = navigation.getParam("studentInfo");

    
    return (
      <View>
        <Text style={styles.welcomeUser}>Student List</Text>

        <FlatList
          data={studentInfo}
          initialNumToRender={5}
          windowSize={5}
          
          renderItem={({ item }) => this.renderStudentInfo(item)}
        />
        <AwesomeAlert
        show={upgradeAlert}
        showProgress={false}
        title={this.state.name}
        message="Upgrade Semester "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
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
          this.upgradeSem();
        }}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
