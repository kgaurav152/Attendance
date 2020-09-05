import React from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Button } from "native-base";
class AttendanceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { studentState: false, backgroundColor: "",studentName:"" };
    this.attendanceHandler = this.attendanceHandler.bind( this );
  }
  attendanceHandler = ( id ) => {
   
    this.setState({
      backgroundColor: "green", 
      studentState : true,
      studentName:id.name
    });

  

    this.props.addRegNo( id.regNo);
                    
  };
  longPressHandler = (  ) => {
    
    this.setState({
      backgroundColor: "#fff",
      studentState: false,
      studentName:""
    });
  
  };
 

  render() {
    return (
      <TouchableHighlight
        style={{
          borderRadius:
            Math.round(
              Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,
          width: Dimensions.get("window").width * 0.2,
          height: Dimensions.get("window").width * 0.2,
          backgroundColor: this.state.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginLeft: 10,
          borderWidth: 5,
          borderColor: "green"
          
        }}
        underlayColor="black"
        onPress={ ()=>this.attendanceHandler(this.props.id)}
        onLongPress={() => this.longPressHandler(this.props.id)}
        delayLongPress={400}
        
      >
      {this.state.studentName===""?(
        <Text >{this.props.id.regNo}</Text>
      ):<Text>{this.props.id.name}</Text>}
      </TouchableHighlight>
    );
  }
}

export default AttendanceBox;
