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
export default class RemoveFacultySubScreen extends Component {
    state={uid:"",subjectName:"",email:""}
    upgradeAlert = (item) => {
        this.setState({
          upgradeAlert: true,
          uid:item.uid,
          subjectName:item.subjectName
        });
      };
      hideAlert=()=>{
          this.setState({
              upgradeAlert:false
          })
      }
      removeSub=()=>{
          Firebase.database().ref("Faculty/").orderByChild("email").equalTo(this.state.email).once("value").then(res=>{
              res.forEach(record=>{
  
                  Firebase.database().ref("Faculty/"+record.key+"/Subject/").child(this.state.uid).remove();
                  alert("Subject Removed")
                  this.setState({
                      upgradeAlert:false
                  })
              })
          })
          
      }
  renderSubjectInfo = (item) => {
    return (
      <Card>
        <View style={styles.fixImage}>
          <View>
            <Text style={styles.paragraph}>Subject Name - {item.subjectName}</Text>
            <Text style={styles.paragraph}>Semester - {item.subjectSem}</Text>
            <View style={styles.fixToText}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.clickButton]}
              onPress={() =>
                this.upgradeAlert(item)
              }
            >
              <Text style={styles.clickText}>Remove Subject</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  componentDidMount(){
    const { navigation } = this.props;
    const email=navigation.getParam("email")
    this.setState({
        email:email
    })
  }
  render() {
    let {upgradeAlert}=this.state;
    const { navigation } = this.props;
    const facultySubjectData = navigation.getParam("facultySubjectData");
    const email=navigation.getParam("email")

    
    return (
      <View>
        <Text style={styles.welcomeUser}>Subject List</Text>

        <FlatList
          data={facultySubjectData}
          initialNumToRender={5}
          windowSize={5}
          contentContainerStyle={{ paddingBottom: "20%"}}
          renderItem={({ item }) => this.renderSubjectInfo(item)}
        />
        <AwesomeAlert
        show={upgradeAlert}
        showProgress={false}
        title={this.state.subjectName}
        message="Remove Subject "
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
          this.removeSub();
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
