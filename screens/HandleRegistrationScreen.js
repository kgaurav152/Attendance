import React, { Component } from "react";
import Firebase from '../components/config'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  FlatList,
  PermissionsAndroid,
  ScrollView,
  AsyncStorage
} from "react-native";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Left } from "native-base";
import axios from 'axios';
import RNCalendarEvents from 'react-native-calendar-events';


function Separator() {
  return <View style={styles.separator} />;
}

export default class HandleRegistrationScreen extends Component {
  state = { item:"",
            email: "",
            name: "",
            department: "",
            role:"",
            semester: "",
            session: "",
            year: "",
            mobile: "",
            reg_no: "",
            password:"",
            registrationRequests:[]
        }
  constructor(props) {
    super(props);
    this.state = { showApprovalAlert: false, showRejectionAlert:false,emailUsed:false };
  };
  
  componentDidMount() {

    const { navigation } = this.props;
    
    this.focusListener = navigation.addListener("didFocus", () => {
      this.fetchRegistrationRequests();
    });
    
  }
  emailUsed = () => {
    this.setState({
      emailUsed: true
    });
  };
  showApprovalAlert = (item) => {
    this.setState({
      showApprovalAlert: true,
      item:item
    });
  };
  hideApprovalAlert = () => {
    this.setState({
      showApprovalAlert: false
    });
  };
  showRejectionAlert = (item) => {
    this.setState({
      showRejectionAlert: true,
      item:item
    });
  };
  hideRejectionAlert = () => {
    this.setState({
      showRejectionAlert: false
    });
  };
  
  fetchRegistrationRequests =  () => {
    
    registrationRequestInfo = [];
    Firebase.database().ref("HandleRegistration").once("value").then(snapshot => {
      const requestInfo = snapshot.val();
      for (let id in requestInfo) {
        let obj = {};
        obj.name = requestInfo[id].name;
        obj.email = requestInfo[id].email;
        obj.department = requestInfo[id].department;
        obj.role = requestInfo[id].role;
        obj.semester = requestInfo[id].semester;
        obj.session = requestInfo[id].session;
        obj.year = requestInfo[id].year;
        obj.mobile = requestInfo[id].mobile;
        obj.reg_no = requestInfo[id].Reg_No;
        obj.password = requestInfo[id].password;
        obj.requestId = id;
        
        
        
        
        registrationRequestInfo.push(obj);
      }
      this.setState({ 
        registrationRequests: registrationRequestInfo,
        
      })
      
      return registrationRequestInfo;

    });
    

  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  
  handleApproval = (item) => {
    
    this.state.status = "Approved"
   
    this.setState({
      status: this.state.status,
      loading:true,
      
    })
    
    const requestDetails = JSON.stringify({
      requestId: item.requestId,
      
    })
    const title = item.name + "is on Leave today"
    
    Firebase.auth()
      .createUserWithEmailAndPassword(item.email,item.password)
      .then(user => {
        if (Firebase.auth().currentUser) {
          userId = Firebase.auth().currentUser.uid;
          role = item.role;
          if (userId) {
            Firebase.database()
              .ref("users/" + userId)
              .set({
                email: item.email,
                role: item.role,
                uid: userId
              });
          }
          if (role == "student") {
            Firebase.database()
              .ref("students/"+userId)
              .set({
                email: item.email,
                name:item.name,
                registration_num: item.reg_no,
                department: item.department,
                semester: item.semester,
                session: item.session,
                year:item.year,
                mobile:item.mobile
              });
          }
          this.hideApprovalAlert();
        }
      })
      .catch(error => {
        this.setState({
          error: error.code
        });
        if (this.state.error === "auth/email-already-in-use") {
          this.emailUsed();
        } else {
        }
      });
      Firebase.database().ref("HandleRegistration/").child(item.requestId).remove();
    this.setState({
      loading: false
    });
  }
  handleRejection = (item) => {
    this.state.status = "Rejected"
    
    this.setState({
      status: this.state.status,
      loading:true
    })
    
    Firebase.database().ref("HandleRegistration").child(item.requestId).remove();
    this.setState({
      loading: false
    });
    this.hideRejectionAlert();   
    this.props.navigation.navigate("AdminScreen");
  }
  
  renderRequest = ({item})=>{
  return(
    
    <View style={styles.container}>
    
    <ScrollView>
      
      <Card
        title={item.name}
        containerStyle={backgroundColor="blue"}
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
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.label}>Registration No:</Text>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.label}>Semester:</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.label}>Mobile Number:</Text>
            <View style={styles.approveButtonStyle}>
            <TouchableHighlight
          style={[styles.buttonContainer, styles.approveButton]}
          onPress={() => {
            this.showApprovalAlert(item);
          }}
        >
          <Text style={styles.loginText}>Approve</Text>
          
        </TouchableHighlight>
        
        </View>
           
          </View>
          <View style={styles.dynamicContent}>
            <Text style={styles.paragraph}>{item.name}</Text>
            <Text style={styles.paragraph}>{item.reg_no}</Text>
            <Text style={styles.paragraph}>{item.department}</Text>
            <Text style={styles.paragraph}>{item.semester}</Text>
            <Text style={styles.paragraph}>{item.email}</Text>
            <Text style={styles.paragraph}>{item.mobile}</Text>
            
            
          
        <View style={styles.rejectButtonStyle}> 
        <TouchableHighlight
          style={[styles.buttonContainer, styles.rejectButton]}
          onPress={() => {
            this.showRejectionAlert(item);
          }}
        >
          <Text style={styles.loginText}>Reject</Text>
        </TouchableHighlight>
        
            </View>  
        
          
            </View>     
            
        
          
          
        </View>
      </Card>
      </ScrollView>
      
      </View>

    )
        }
                  


  render() {
   
    const { navigation } = this.props;
    
    const {showApprovalAlert} = this.state;
    const {showRejectionAlert} = this.state;
    
    return (

      <SafeAreaView style={styles.container}>
        
        <Text style={styles.desk}>Registration Requests</Text>
        
        <View style={styles.fixDate}>
        

          <FlatList
            
            data={this.state.registrationRequests}
            initialNumToRender={5}
            windowSize={5}
            style={styles.paragraph1}
            renderItem={this.renderRequest}
            keyExtractor={item => item.requestId}
          />

        </View>
        <AwesomeAlert
              show={showApprovalAlert}
              showProgress={false}
              title={"Approve Registration Request"}
              message={"Confirm to approve Request"}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Cancel"
              confirmText="Confirm"
              contentContainerStyle={{
                backgroundColor: "white",
                width: "80%",
                height: "35%",
                marginTop:'30%'
              }}
              confirmButtonColor="#10356c"
              onCancelPressed={() => {
                this.hideApprovalAlert();
              }}
              onConfirmPressed={() => {
                this.handleApproval(this.state.item);
              }}
            />
            <AwesomeAlert
              show={showRejectionAlert}
              showProgress={false}
              title={"Reject Leave Request"}
              message={"Please press Reject to Confirm"}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Cancel"
              confirmText="Reject"
              contentContainerStyle={{
                backgroundColor: "white",
                width: "80%",
                height: "35%",
                marginTop:'30%'
              }}
              confirmButtonColor="#10356c"
              onCancelPressed={() => {
                this.hideRejectionAlert();
              }}
              onConfirmPressed={() => {
                this.handleRejection(this.state.item);
              }}
            />

      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1
  },
  grid: {
    flex: 1,
    backgroundColor: '#E8E8E8'
  },

  gridRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  dynamicContent: {
    marginLeft: 1,
    marginRight:1,
    flexDirection:"column",
    justifyContent:"flex-end"
  },
  gridItemText: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: "900",
    borderRadius: 30,
    padding: 5

  },
  approveButtonStyle: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  rejectButtonStyle: {
    flexDirection: "row-reverse",
    justifyContent: "center"
  },

  fixImage: {
    justifyContent: "flex-start",
    flexDirection: "row",
  
  },
  paragraph: {
    margin: 1.5,
    marginLeft:5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  paragraph1: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
    marginRight: "2%"
  },
  desk: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "600",
    color: "#dc143c",
    marginBottom:10
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
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
    marginLeft: 15,

  },
  fixDate: {
    flexDirection: "row",
    justifyContent: "space-between",

    textAlign: "center",
    marginLeft: 15
  },
  buttonContainer: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 100,
    marginTop:20,
    borderRadius: 10
  },
  approveButton: {
    backgroundColor: "green",
    
    
  },
  rejectButton: {
    backgroundColor: "red",
    
  },
  loginText: {
    color: "white"
  },
  headText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 14
  },
  
});
