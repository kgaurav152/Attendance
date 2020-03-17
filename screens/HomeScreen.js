import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Alert, NetInfo } from "react-native";
import Constants from "expo-constants";

import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
function Separator() {
  return <View style={styles.separator} />;
}


export default class Homescreen extends Component {
  state ={
    Info:""
  }
 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%"
          }}
          start={{ x: 0, y: 1}}
          end={{ x: 1, y: 1}}
        >
          <View>
            <Text style={styles.title}>Online Attendance System</Text>
            <Text style={styles.title}>{this.state.Info}</Text>
            <View style={styles.fixToText}>
         
              <Button
                onPress={() => this.props.navigation.navigate("Login")}
                titleStyle={{
                  color: "#fffaf0",
                  fontSize: 23,
                  fontWeight: "bold"
                }}
                buttonStyle={{
                  backgroundColor: "#09C5F7",
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
                  fontSize: 23,
                  fontWeight: "700"
                }}
                buttonStyle={{
                  backgroundColor: "#09C5F7",
                  borderRadius: 10,
                  flex: 1,
                  height: "20%",
                  width: "75%",
                  marginLeft: "8%",
                  marginBottom: "2%"
                }}
                title="KEC Katihar "
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
                  backgroundColor: "#09C5F7",
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
                  backgroundColor: "#09C5F7",
                  borderRadius: 10,
                  flex: 1,
                  height: "20%",
                  width: "92%",

                  marginTop: 10
                }}
                title="About"
              />
            </View>
            <Text style={styles.footer}>{"\u00A9"} 2020 KEC Katihar</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    marginBottom: "10%",
    marginLeft: "6%",
    fontSize: 20,
    color: "#09C5F7",
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