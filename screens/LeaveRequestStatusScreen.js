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
  AsyncStorage,
  
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

export default class LeaveRequestStatus extends Component {
  state = {  leaveRequestHistory: [],loading: false, email:''}
  
  constructor(props) {
    super(props);
    this.state = {  showDeleteAlert:false };
    
  };
  
  componentDidMount() {

    const { navigation } = this.props;
    const email = navigation.getParam("email");
    this.setState({
      email:email
    })
   this.focusListener = navigation.addListener("didFocus", () => {
     this.fetchLeaveRequestHistory();
    });
   
  }
 
  showDeleteAlert = () => {
    this.setState({
      showDeleteAlert: true
    });
  };
  hidedeletionAlert = () => {
    this.setState({
      showDeleteAlert: false
    });
  };
  
  fetchLeaveRequestHistory = () => {
    
    leaveRequestInfo = [];
    Firebase.database().ref("LeaveRequestHistory").orderByChild("email").equalTo(this.state.email).once("value").then(snapshot => {
      const requestInfo = snapshot.val();
      for (let id in requestInfo) {
        let obj = {};
        obj.name = requestInfo[id].name;
        obj.leaveType = requestInfo[id].leaveType;
        obj.startDate = requestInfo[id].startDate;
        obj.endDate = requestInfo[id].endDate;
        obj.requestDate = requestInfo[id].requestDate;
        obj.status= requestInfo[id].status;
        obj.leaveId= requestInfo[id].leaveId
        
        leaveRequestInfo.push(obj);
      }
      this.setState({ 
        leaveRequestHistory: leaveRequestInfo,
        
      })

      return leaveRequestInfo;

    });
    

  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  
  
  handleDelete = (item) => {
   

    Firebase.database().ref("LeaveRequestHistory").orderByChild("email").equalTo(item.email).remove();
    this.setState({
      loading: false
    });
    this.props.navigation.navigate("FacultyWelcome");
  }
  
  renderRequest = ({item})=>{
    this.setState({
      item:item
    })
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
            <Text style={styles.label}>Leave Type:</Text>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.label}>Request Date:</Text>
            <Text style={styles.label}>Request Status:</Text>
            
           
          </View>
          <View style={styles.dynamicContent}>
            <Text style={styles.paragraph}>{item.leaveType}</Text>
            <Text style={styles.paragraph}>{item.startDate}</Text>
            <Text style={styles.paragraph}>{item.endDate}</Text>
            <Text style={styles.paragraph}>{item.requestDate}</Text>
            <Text style={styles.paragraph}>{item.status}</Text>
            
          
        <View style={styles.rejectButtonStyle}> 
        <TouchableHighlight
          style={[styles.buttonContainer, styles.rejectButton]}
          onPress={() => {
            this.showDeleteAlert();
          }}
        >
          <Text style={styles.loginText}>Delete</Text>
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
    const email = navigation.getParam("email");
    const name = navigation.getParam("  ");
    const department = navigation.getParam("department");
    const mobile = navigation.getParam("mobile");
    const imageUrl = navigation.getParam("imageUrl");
    
   
    const {showDeleteAlert} = this.state;
    return (

      <SafeAreaView style={styles.container}>
        
        <Text style={styles.desk}>Leave Request Status</Text>
        
        <View style={styles.fixDate}>
        

          <FlatList
            
            data={this.state.leaveRequestHistory}
            initialNumToRender={5}
            windowSize={5}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={item.leaveId}
            style={styles.paragraph1}
            renderItem={this.renderRequest}
           
          />

        </View>
        
            <AwesomeAlert
              show={showDeleteAlert}
              showProgress={false}
              title={"Delete Leave Request Status"}
              message={"Please press Delete to Confirm"}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Cancel"
              confirmText="Delete"
              contentContainerStyle={{
                backgroundColor: "white",
                width: "80%",
                height: "35%",
                marginTop:'30%'
              }}
              confirmButtonColor="#10356c"
              onCancelPressed={() => {
                this.hideDeleteAlert();
              }}
              onConfirmPressed={() => {
                this.handleDelete(this.state.item);
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
