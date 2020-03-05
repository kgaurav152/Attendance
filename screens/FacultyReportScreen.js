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
  VirtualizedList
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import Firebase from "../components/config";
import { Col, Row, Grid } from "react-native-easy-grid";

function Separator() {
  return <View style={styles.separator} />;
}

export default class FacultyReportScreen extends Component {
  state = { attendanceList: [], dateList: [] };

  componentDidMount() {
    const { navigation } = this.props;
    const attendanceList = navigation.getParam("attendanceList");
    const dateList = navigation.getParam("dateList");
    this.setState({
      attendanceList: attendanceList,
      dateList: dateList
    });
  }

  constructGridRow = ( attendanceList, array, keys, index) =>
  (
    <Row key = {keys[index]}>
                    {
                      
                      array.map(function(val, i){
                        if(i == 0){
                          return <Col key = {val}  ><Text>{keys[index]}</Text></Col>
                        }
                        else{
                          let isPresent = "P"
                          if (attendanceList[i][keys[index]] == false){
                            isPresent = "A";
                          }
                          return <Col key = {val}  ><Text>{isPresent}</Text></Col>
                        }
                            
                      })
                    }
                  </Row>
  );
  
  constructGridHeader = (array, keys, index) => (
    <Row key = {keys[index]}>{
                   
      array.map(function(val, i){

        if( i == 0 ){
          return <Col key = {val} ><Text>{"Reg No."}</Text></Col>
        } 
        else  return <Col key = {val}  ><Text>{val}</Text></Col>
       })
       
      }</Row>
  )
  constructGrid = (attendanceList, array, keys, _this) =>
  (
    <Grid>
          { 
                 attendanceList.map(function(item, index){
                 if(index == 0){
                      return _this.constructGridHeader(array, keys, index);
                 }
                 else{
                  return _this.constructGridRow(attendanceList, array, keys, index);
                 }
                })
              
          }
        </Grid>
  )
      
  render() {
    const { navigation } = this.props;
    let renderGrid = false;
    const department = navigation.getParam("department");
    const sem = navigation.getParam("semester");
    const attendanceList = this.state.attendanceList;
    const dateList = this.state.dateList;
    let keys = null;
    let array = null;
    const  hello = "Hello123";
    if(attendanceList.length > 0){
      keys = Object.keys(attendanceList[0]);
    }

    if(keys ==null || dateList==null || dateList.length ==0 || attendanceList == null || attendanceList.length == 0)
    {
      renderGrid = false;
    }
    else{
      renderGrid = true;
      attendanceList.unshift({key : "renderHead"});
      keys.unshift("Reg No.");
      array = dateList;
      array.unshift("");
    }
    

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
                Department - {JSON.stringify(department).replace(/\"/g, "")}
              </Text>

              <Text style={styles.paragraph}>
                Semester - {JSON.stringify(sem).replace(/\"/g, "")}
              </Text>
            </View>
          </View>
        </Card>
        <View style={styles.fixDate}>
          <Text style={styles.paragraph1}>Date</Text>
          <Text style={styles.paragraph}>Attendance List </Text>
        </View>
        
        {
          
          renderGrid && this.constructGrid(attendanceList, array, keys, this) 
        }
                
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
    
    color: "#008b8b",
    
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
