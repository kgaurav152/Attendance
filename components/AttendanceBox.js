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
    this.state = { studentState: new Boolean() };
  }
  attendanceHandler = () => {
    state = { backgroundColor: "#fff" };
    this.setState({
      backgroundColor: "green"
    });
  };
  longPressHandler = () => {
    state = { backgroundColor: "green" };
    this.setState({
      backgroundColor: "#fff",
      studentState: false
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
        onPress={() => this.attendanceHandler()}
        onLongPress={() => this.longPressHandler()}
      >
        <Text>{this.props.id}</Text>
      </TouchableHighlight>
    );
  }
}

export default AttendanceBox;
