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
  ScrollView,
  AsyncStorage
} from "react-native";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Left } from "native-base";
function Separator() {
  return <View style={styles.separator} />;
}

export default class ShowLeaveRequest extends Component {
  state = { startDate: "",endDate:"", leaveType: "", status: "", leaveRequests: [],loading: false}
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };
  
  componentDidMount() {

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.fetchLeaveRequests();
    });

  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  
  fetchLeaveRequests = async () => {
    
    leaveRequestInfo = [];
    Firebase.database().ref("Request").once("value").then(snapshot => {
      const requestInfo = snapshot.val();
      for (let id in requestInfo) {
        let obj = {};
        obj.name = requestInfo[id].name;
        obj.leaveType = requestInfo[id].leaveType;
        obj.startDate = requestInfo[id].startDate;
        obj.endDate = requestInfo[id].endDate;
        obj.casualLeaveLeft = requestInfo[id].casualLeaveLeft;
        obj.dutyLeaveLeft = requestInfo[id].dutyLeaveLeft;
        obj.leaveId = id;
        let startDate = moment(requestInfo[id].startDate,"YYYY/MM/DD");
        let endDate = moment(requestInfo[id].endDate,"YYYY/MM/DD");
        
        let numOfDays = endDate.diff(startDate,"days");
        obj.numOfDays = numOfDays + 1
         
        leaveRequestInfo.push(obj);
      }
      this.setState({ leaveRequests: leaveRequestInfo })

      return leaveRequestInfo;

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
      loading:true
    })
    Firebase.database().ref("LeaveRequestHistory").push({
      name: item.name,
      startDate: item.startDate,
      endDate:item.endDate,
      status: this.state.status
    })
    Firebase.database().ref("Faculty").orderByChild("name").equalTo(item.name).once("value").then(snapshot => {
      facultyInfo = snapshot.val();

      for (let fid in facultyInfo) {

        let facultyId = fid;
        let casualLeave = facultyInfo[fid].CL;
        let dutyLeave = facultyInfo[fid].DL;
        if (item.leaveType == "CL") {
          casualLeave = casualLeave - item.numOfDays;
        } else if (item.leaveType == "DL") {
          dutyLeave = dutyLeave - item.numOfDays;
        }

        Firebase.database().ref("Faculty/").child(facultyId).update({
          CL: casualLeave,
          DL: dutyLeave
        })
        


      }


    })
    Firebase.database().ref("Request/").child(item.leaveId).remove();
    this.setState({
      loading: false
    });
    this.props.navigation.navigate("Principal");
  }
  handleRejection = (item) => {
    this.state.status = "Reject"
    this.setState({
      status: this.state.status,
      loading:true
    })
    Firebase.database().ref("LeaveRequestHistory").push({
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      status: this.state.status
    })

    Firebase.database().ref("Request").child(item.leaveId).remove();
    this.setState({
      loading: false
    });
    this.props.navigation.navigate("Principal");
  }
  
  renderRequest = (item) =>{
    const {showAlert} = this.state;
   return(
    
    <View style={styles.container}>
    <Text style={styles.desk}>Leave Request</Text>
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
            <Text style={styles.label}>Leave Type:</Text>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.label}>Leave Balance:</Text>
            <Text style={styles.label}>No. of Days:</Text>
           
            <View style={styles.rejectButtonStyle}> 
        <TouchableHighlight
          style={[styles.buttonContainer, styles.rejectButton]}
          onPress={() => {
            this.showAlert();
          }}
        >
          <Text style={styles.loginText}>Reject</Text>
        </TouchableHighlight>
        <AwesomeAlert
              show={showAlert}
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
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.handleRejection(item);
              }}
            />
            </View>  
          </View>
          <View style={styles.dynamicContent}>
            <Text style={styles.paragraph}>{item.leaveType}</Text>
            <Text style={styles.paragraph}>{item.startDate}</Text>
            <Text style={styles.paragraph}>{item.endDate}</Text>
            {item.leaveType == "CL"? <Text style={styles.paragraph}>{item.casualLeaveLeft}</Text>:<Text style={styles.paragraph}>{item.dutyLeaveLeft}</Text> }
            <Text style={styles.paragraph}>{item.numOfDays}</Text>
          
            
          <View style={styles.approveButtonStyle}>
            <TouchableHighlight
          style={[styles.buttonContainer, styles.approveButton]}
          onPress={() => {
            this.showAlert();
          }}
        >
          <Text style={styles.loginText}>Approve</Text>
          
        </TouchableHighlight>
        <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={"Approve Leave Request"}
              message={"Confirm to approve Leave"}
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
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.handleApproval(item);
              }}
            />
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
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const department = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
    let leaveRequestInfo = [];

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

              <Text style={styles.paragraph}>Assistant Prof.</Text>
              <Text style={styles.paragraph}>{department}</Text>

              <Text style={styles.paragraph}>{mobile}</Text>
              <Text style={styles.paragraph}>{email}</Text>
            </View>
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
        
        <View style={styles.fixDate}>


          <FlatList
            
            data={this.state.leaveRequests}
            initialNumToRender={5}
            windowSize={5}
            style={styles.paragraph1}
            renderItem={({item})=>this.renderRequest(item)}
            keyExtractor={item => item.leaveId}
          />

        </View>

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
    marginLeft: 20,
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
    flexDirection: "row",
    justifyContent: "flex-end"
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
