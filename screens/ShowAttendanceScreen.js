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
  state = { dateSelectedList: [], presentStateList: [] };

  componentDidMount() {

  }

  renderAttendance = (item) => {
    
    return (
      <View style = { (item.presenceState ) ? 
                    [styles.gridRow, {backgroundColor:"green" }]: 
                    [styles.gridRow,{ backgroundColor:"red"}] }>
        <Text style={styles.gridItemText}>
          {item.date}
        </Text>
        <Text style={styles.gridItemText}>
          {item.presenceState.toString()}
        </Text>
      </View>
    )
  }
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const name = navigation.getParam("name");
    const reg_no = navigation.getParam("reg_no");
    const department = navigation.getParam("department");
    const sem = navigation.getParam("semester");
    const studAttendenceIno = navigation.getParam("studAttendenceIno");

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
              <Text style={styles.paragraph}>
                Reg. No - {JSON.stringify(reg_no).replace(/\"/g, "")}
              </Text>
              <Text style={styles.paragraph}>
                {JSON.stringify(department).replace(/\"/g, "")}
              </Text>

              <Text style={styles.paragraph}>
                {JSON.stringify(email).replace(/\"/g, "")}
              </Text>
            </View>
          </View>
        </Card>
        <View style={styles.fixDate}>
          <Text style={styles.paragraph}>Date</Text>
          <Text style={styles.paragraph1}>Present State</Text>
        </View>
        <View style={styles.fixToText}>


          <FlatList
            data={studAttendenceIno}
            initialNumToRender={10}
            windowSize={5}
            style={styles.grid}
            con
            renderItem={({ item }) => this.renderAttendance(item)}
          />

        </View>

        <Separator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  grid: {
    flex: 1,
    backgroundColor: '#E8E8E8'
  },

  gridRow:{
    flex: 1, 
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },

  gridItemText: {
    marginTop: 5,
    textAlign:'center',
    fontWeight: "900",
    borderRadius: 30,
    padding: 5
    
  },

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
  paragraph1: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b",
    marginRight: "20%"
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

    textAlign: "center",
    marginLeft: 15
  },
  fixDate: {
    flexDirection: "row",
    justifyContent: "space-between",

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
