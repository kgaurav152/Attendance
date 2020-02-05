import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
  ListItem
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
function Separator() {
  return <View style={styles.separator} />;
}



export default class ShowAttendanceScreen extends Component {
  state = {dateSelectedList:[], presentStateList:[]}  
  renderDate = ({item}) => {
    return (
      <Text style={styles.paragraph}>
        {item}
      </Text>
    )
  }
  renderState = ({item}) => {
    return (
      <Text style ={styles.paragraph} >
        Present State {item}
      </Text>
    )
  }
  componentDidMount(){
      const { navigation } = this.props;
      const dateSelectedList =navigation.getParam("dateSelected");
      const presentStateList = navigation.getParam("presentStatelist")
      this.setState({
        dateSelectedList: dateSelectedList,
        presentStateList: presentStateList
      })
     }
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    //const name = navigation.getParam("name");
    const reg_no=navigation.getParam("reg_no");
   
    const department =navigation.getParam("department");
   
    const sem = navigation.getParam("sem")
    
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
        <Card
          
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
              <Text style={styles.paragraph}>Reg. No - {JSON.stringify(reg_no).replace(/\"/g, "")}</Text>
              <Text style={styles.paragraph}>{JSON.stringify(department).replace(/\"/g, "")}</Text>
              
              <Text style={styles.paragraph}>{JSON.stringify(email).replace(/\"/g, "")}</Text>
            </View>
            
          </View>
        </Card>

        <View style={styles.fixToText}>
          <FlatList
            data = {this.state.dateSelectedList}
            renderItem = {this.renderDate}
          />
        </View>
        <View style = {styles.fixToText}>
          <FlatList
            data = {this.state.presentStateList}
            renderItem = {this.renderState}
          />
        </View>
        <Separator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
  },
  buttonContainer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15
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
    marginLeft: 15
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
