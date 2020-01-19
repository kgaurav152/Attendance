import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Alert } from "react-native";
import Constants from "expo-constants";

import { Button } from "react-native-elements";

function Separator() {
  return <View style={styles.separator} />;
}

export default class Homescreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Online Attendance System</Text>
          <View style={styles.fixToText}>
            <Button
              onPress={() => this.props.navigation.navigate("Login")}
              titleStyle={{
                color: "#fffaf0",
                fontSize: 23,
                fontWeight: "bold"
              }}
              buttonStyle={{
                backgroundColor: "#FD8804",
                borderRadius: 10,
                flex: 1,
                height: "20%",
                width: "90%",
                marginBottom: "2%"
              }}
              title="Login"
            />

            <Button
              onPress={() => this.props.navigation.navigate("KEC_Katihar")}
              titleStyle={{
                color: "#fffff0",
                fontSize: 20,
                fontWeight: "700"
              }}
              buttonStyle={{
                backgroundColor: "#FD8804",
                borderRadius: 10,
                flex: 1,
                height: "20%",
                width: "80%",
                marginLeft: "2%",
                marginBottom: "2%"
              }}
              title="KEC_Katihar "
            />
          </View>
        </View>
        <Separator />
        <View>
          <View style={styles.fixToText}>
            <Button
              onPress={() => this.props.navigation.navigate("Developers")}
              titleStyle={{
                color: "#fffaf0",
                fontSize: 23
              }}
              buttonStyle={{
                backgroundColor: "#FD8804",
                borderRadius: 10,
                flex: 1,
                height: "20%",
                width: "83%",
                marginTop: 10
              }}
              title="Developers"
            />
            <Button
              onPress={() => Alert.alert("About the App")}
              titleStyle={{
                color: "#fffaf0",
                fontSize: 23
              }}
              buttonStyle={{
                backgroundColor: "#FD8804",
                borderRadius: 10,
                flex: 1,
                height: "20%",
                width: "85%",

                marginTop: 10
              }}
              title="About"
            />
          </View>
          <Text style={styles.footer}>{"\u00A9"} 2020 KEC Katihar</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: "2%"
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    marginBottom: "10%",
    marginLeft: "12%",
    fontSize: 20,
    color: "#008b8b",
    fontWeight: "bold"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
    marginLeft: 15
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftButton: {
    textAlign: "center",
    fontSize: 21
  },
  footer: {
    fontWeight: "900",
    fontSize: 22,
    color: "#7b68ee",
    textAlign: "center",
    marginTop: 40
  }
});
