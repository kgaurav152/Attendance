import React from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Button } from "native-base";
class UpdateAttendanceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentState: false,
      backgroundColor: "",
      studentName: "",
      regNo: this.props.id.regNo,
    };
    this.attendanceHandler = this.attendanceHandler.bind(this);
    this.longPressHandler = this.longPressHandler.bind(this);
  }
  attendanceHandler = (id) => {
    this.setState({
      backgroundColor: "green",
      studentState: true,
    });

    this.props.addRegNo(id.regNo);
  };
  longPressHandler = (id) => {
    this.props.removeRegNo(id.regNo);
    this.setState({
      backgroundColor: "#fff",
      studentState: false,
      studentName: "",
    });
  };
  componentDidMount = () => {
    if (this.props.id.presence === true) {
      this.props.addRegNo(this.props.id.regNo);
      this.setState({
        backgroundColor: "green",
      });
    }
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
          borderColor: "green",
        }}
        underlayColor="#ffffff00"
        onPress={() => this.attendanceHandler(this.props.id)}
        onLongPress={() => this.longPressHandler(this.props.id)}
        delayLongPress={400}
      >
        <Text>{this.props.id.regNo}</Text>
      </TouchableHighlight>
    );
  }
}

export default UpdateAttendanceBox;
