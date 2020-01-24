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
class AttendanceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { studentState: false, backgroundColor: "" };
    this.attendanceHandler = this.attendanceHandler.bind( this );
  }
  attendanceHandler = ( id ) => {
    state = { backgroundColor: "#fff" };
    this.setState({
      backgroundColor: "green", 
      studentState : true
    });

    this.setState({ studentState : true}, () =>{
      console.log(this.state.backgroundColor)
      console.log(this.state.studentState);
      console.log( id );
    })

    this.props.addRegNo( id );
                    
  };
  longPressHandler = (  ) => {
    state = { backgroundColor: "green" };
    this.setState({
      backgroundColor: "#fff",
      studentState: false
    });
  
    console.log(this.state);
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
        onPress={() => this.attendanceHandler( this.props.id )}
        onLongPress={() => this.longPressHandler( this.props.id )}
        delayLongPress={10000}
      >
        <Text>{this.props.id}</Text>
      </TouchableHighlight>
    );
  }
}

export default AttendanceBox;
