import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
function Separator() {
  return <View style={styles.separator} />;
}
export default class AdminScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
        <Card style={styles.card}
          title="Md TALIB AHMAD"
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
              <Text style={styles.paragraph}>Assistant Prof.</Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 9108006551</Text>
              <Text style={styles.paragraph}>mdtalibahmad@gmail.com</Text>
            </View>
            <Image
              source={require("../assets/mta.jpg")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
        <Separator/>
        <View>
            <View style={styles.fixToText}>
              <Button
                onPress={() => this.props.navigation.navigate("AssignSubject")}
                titleStyle={{
                  color: "#fffaf0",
                  fontSize: 23,
                  fontWeight: "800"
                }}
                buttonStyle={{
                  backgroundColor: "#09C5F7",
                  borderRadius: 10,
                  flex: 1,
                  height: "20%",
                  width: "70%",
                  marginBottom: "2%"
                }}
                title="Assign Subject"
              />

              <Button
                onPress={() => this.props.navigation.navigate("GenerateReport")}
                titleStyle={{
                  color: "#fffff0",
                  fontSize: 20,
                  fontWeight: "700"
                }}
                buttonStyle={{
                  backgroundColor: "#09C5F7",
                  borderRadius: 10,
                  flex: 1,
                  height: "20%",
                  width: "70%",
                  marginLeft: "2%",
                  marginBottom: "2%"
                }}
                title="Generate Report "
              />
            </View>
          </View>
          <Separator />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 50        
    },
   fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
    marginLeft: 15
  },
  card: {
      marginBottom: 50, 
  },
  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row",
    
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
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
  }
});
