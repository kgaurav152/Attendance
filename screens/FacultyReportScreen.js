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

constructGridRow = ( attendanceList, array, keys, item, keysindex, index) => 
{
        let displayText = attendanceList[index][keys[keysindex]] ? "P" : "A";
        let elementStyle = displayText == "P" ? 
                                              {...styles.CircleShapeView , backgroundColor: 'green'}:
                                              {...styles.CircleShapeView , backgroundColor: 'red'};
        if(index == 0){
            displayText = keys[keysindex];
            elementStyle =  {...styles.CircleShapeView , backgroundColor: '#3498db'};
        }
        return (     
                  <View style = {elementStyle} key = { keysindex.toString() + index.toString()} >
                    <Text 
                        style = {styles.column}>{ displayText }
                    </Text>
                  </View>
        ) 
} 
      
constructGridHeader = (array, keys, keysindex, index) => 
            <View key = {keysindex.toString() + index.toString()} style= {{ height: 30}}>
              <Text                  
                  style = {styles.column}>{array[index]}
              </Text>
            </View>
            
  
  constructGrid = (attendanceList, array, keys, _this, props, i) =>{
   
    let { item } = props; 
    let { index } = props;
    let cols = array.map(function(i,j, arr){
    if(index == 0){
         return _this.constructGridHeader(array, keys, index, j); 
    }
    else{
     return _this.constructGridRow(attendanceList, array, keys ,item, index, j);
    }
   });
   
  return  <View key = { index } style = { styles.row }>{cols}</View>
  
}
      
  render() {
    const { navigation } = this.props; 
    let renderGrid = false;
    const department = navigation.getParam("department");
    const sem = navigation.getParam("semester");
    const sub = navigation.getParam("subject")
    const attendanceList = this.state.attendanceList;
    const dateList = this.state.dateList;
    let keys = null;
    let array = null;
    let noOfColumns;
    if(attendanceList.length > 0){
      keys = Object.keys(attendanceList[0]);
    }

    if(keys ==null || dateList==null || dateList.length ==0 || attendanceList == null || attendanceList.length == 0)
    {
      renderGrid = false;
    }
    else{
      renderGrid = true;
      array = dateList;
      for(let i = 0; i < 60; i++){
        attendanceList.push(attendanceList[1]);
        array.push(array[1]);
        keys.push(keys[1]);
        noOfColumns = keys.length;

      }
      array.unshift("");
      attendanceList.unshift({key : "renderHead"});
      keys.unshift("Reg No.");
    }
    

    return (
      <ScrollView
      horizontal={true}>
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
              <Text style={styles.paragraph}>
                Subject - {JSON.stringify(sub).replace(/\"/g, "")}
              </Text>
            </View>
          </View>
        </Card>
        <View style={styles.fixDate}>
          <Text style={styles.paragraph1}>Date</Text>
          <Text style={styles.paragraph}>Attendance List </Text>
        </View>
        <View style = { styles.gridContainer}>
        <ScrollView>
        <FlatList
            horizontal 
            data={keys} 
            windowSize = { 3 }
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender = { 5 }
            key = { noOfColumns } 
            renderItem = {this.constructGrid.bind(this,attendanceList, array, keys, this)}
      />
      </ScrollView>
      </View>
      <Separator />
      </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  
  gridContainer : {
    marginTop: 20,
    flex: 1,
  },
  
  row:{
    flex: 1,
    padding: 15,
    marginBottom: 5,
    flexDirection: 'column'
  },
  column: {
    //flex: 1
  },
  CircleShapeView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems:'center', 
    justifyContent:'center',  
},

OvalShapeView: {
  marginTop: 20,
  width: 100,
  height: 100,
  backgroundColor: '#00BCD4',
  borderRadius: 50,
  transform: [
    {scaleX: 2}
  ]
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
