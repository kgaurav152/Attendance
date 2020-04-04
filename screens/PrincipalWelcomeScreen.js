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
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
function Separator() {
  return <View style={styles.separator} />;
}

export default class PrincipalWelcomeScreen extends Component {

  componentDidMount() {

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.fetchLeaveRequests();
    });

  }

  fetchLeaveRequests = async () => {
    leaveRequestInfo = [];
    Firebase.database().ref("Request").once("value").then(snapshot => {
      const requestInfo = snapshot.val();
      for (let id in requestInfo) {
        let obj = {};
        obj.name = requestInfo[id].name;
        obj.leaveType = requestInfo[id].leaveType;
        obj.date = requestInfo[id].date;
        obj.leaveId = id;
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

  state = { date: "", leaveType: "", status: "", leaveRequests: [] }
  handleApproval = (item) => {
    this.state.status = "Approved"
    this.setState({
      status: this.state.status
    })
    Firebase.database().ref("LeaveRequestHistory").push({
      name: item.name,
      date: item.date,
      status: this.state.status
    })


    const leaveRequest = Firebase.database().ref("Request/").child(item.leaveId);
    Firebase.database().ref("Faculty").orderByChild("name").equalTo(item.name).once("value").then(snapshot => {
      facultyInfo = snapshot.val();

      for (let fid in facultyInfo) {

        let facultyId = fid;
        let casualLeave = facultyInfo[fid].CL;
        let dutyLeave = facultyInfo[fid].DL;
        if (item.leaveType == "CL") {
          casualLeave = casualLeave - 1;
        } else if (item.leaveType == "DL") {
          dutyLeave = dutyLeave - 1;
        }

        Firebase.database().ref("Faculty/").child(facultyId).update({
          CL: casualLeave,
          DL: dutyLeave
        })
        Firebase.database().ref("Faculty").child(fid).push(leaveRequest);


      }


    })
    Firebase.database().ref("Request/").child(item.leaveId).remove();
  }
  handleRejection = (item) => {
    this.state.status = "Reject"
    this.setState({
      status: this.state.status
    })
    Firebase.database().ref("LeaveRequestHistory").push({
      name: item.name,
      date: item.date,
      status: this.state.status
    })

    Firebase.database().ref("Request").child(item.leaveId).remove();
  }
  renderRequest = ({item}) => (
      <View><Text>
        {item.name}
      </Text>
        <Text >
          {item.leaveType}
        </Text>
        <Text >
          {item.date}
        </Text>        
      </View>
    )


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
          <Text style={styles.paragraph1}>Name</Text>
          <Text style={styles.paragraph1}>Leave type</Text>
          <Text style={styles.paragraph1}>Date</Text>
          <Text style={styles.paragraph1}>Status</Text>
        </View>
        <View style={styles.fixDate}>


          <FlatList
            horizontal
            data={this.state.leaveRequests}
            initialNumToRender={5}
            windowSize={5}
            style={styles.paragraph1}
            renderItem={this.renderRequest}
            keyExtractor={item => item.leaveId}
          />

        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

  gridItemText: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: "900",
    borderRadius: 30,
    padding: 5

  },

  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  paragraph1: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
    marginRight: "2%"
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
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 75,
    borderRadius: 10
  },
  approveButton: {
    backgroundColor: "green"
  },
  rejectButton: {
    backgroundColor: "red"
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
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
