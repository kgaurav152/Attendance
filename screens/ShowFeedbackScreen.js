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
  ListItem,
  SectionList,
  VirtualizedList,
  Alert
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
import { Col, Row, Grid } from "react-native-easy-grid";

function Separator() {
  return <View style={styles.separator} />;
}

export default class ShowFeedbackScreen extends Component {
  state = { nameList:[], feedbackList: [], emailList: [] };

  componentWillMount() {
    var db_nameList = [];
    var db_feedbackList = [];
    var db_emailList = [];
    Firebase.database()
      .ref("Feedback/")
      .once("value")
      .then(snapshot => {
        var feedbackInfo = snapshot.val();
        var db_name = "";
        var db_feedback = "";
        var db_email = "";
        for (var attributes in feedbackInfo) {
          db_name = feedbackInfo[attributes].name;
          db_feedback = feedbackInfo[attributes].feedback;
          db_email = feedbackInfo[attributes].email;
          db_nameList.push(db_name);
          db_feedbackList.push(db_feedback);
          db_emailList.push(db_email);
        }
        this.setState({
          nameList: db_nameList,
          feedbackList: db_feedbackList,
          emailList: db_emailList
        });
      });
    
  }

  render() {
    
    return (
      //<ScrollView
      //horizontal={true}>
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
        ></Card>

        <View style={styles.gridContainer}>
          <ScrollView>
            <Text>{this.state.nameList}</Text>
          </ScrollView>
        </View>
        <Separator />
      </SafeAreaView>
      //</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 20,
    flex: 1
  },

  row: {
    flex: 1,
    padding: 15,
    marginBottom: 5,
    flexDirection: "column"
  },
  countRow: {
    flex: 1,
    padding: 15,
    marginBottom: 5,
    flexDirection: "row"
  },
  column: {
    //flex: 1
  },
  CircleShapeView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    flex: 1
  },
  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  fixDate: {
    flexDirection: "row",
    justifyContent: "space-between",

    textAlign: "center",
    marginLeft: 15
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",

    textAlign: "center",
    marginLeft: 15
  },
  paragraph1: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",

    color: "#008b8b"
  },
  paragraph: {
    margin: 1.5,
    marginRight: "25%",
    fontSize: 14,
    fontWeight: "700",

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
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});
