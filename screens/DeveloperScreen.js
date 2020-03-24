import React from "react";

import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

import { Card } from "react-native-elements";

export default class DevelopersScreen extends React.Component {
  render() {
    return (
      
      
      <View style={styles.container}>
      <Text style={styles.desk}>Developers Desk</Text>
      <ScrollView>
        
        <Card
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
              <Text style={styles.paragraph}>
                Project Guide & Assistant Prof.
              </Text>
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
        <Card
          title="Dr. PRADEEP KR. SHARMA"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>
                Project Guide & Assistant Prof.{" "}
              </Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 8876024875</Text>
              <Text style={styles.paragraph}>cspradeepindia@gmail.com</Text>
            </View>
            <Image
              source={require("../images/pradeep.jpg")}
              style={{
                width: 90,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
        <Card
          title="ANKIT DUTTA"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>UX & Backend Developer</Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 8757399001</Text>
              <Text style={styles.paragraph}>ankitdutta17@gmail.com</Text>
            </View>
            <Image
              source={require("../images/ankit.jpg")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 70 / 2
              }}
            />
          </View>
        </Card>
        <Card
          title="ANSHUMAN PD CHOUDHARY BADAL"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>
                UI Designer & Backend Developer
              </Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 7091177725</Text>
              <Text style={styles.paragraph}>apcbadal@gmail.com</Text>
            </View>
            <Image
              source={require("../images/anshu.jpg")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
        <Card
          title="DHIRAJ KUMAR DAS"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>UI/UX Designer</Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 8809690962</Text>
              <Text style={styles.paragraph}>dhirajbgp06@gmail.com</Text>
            </View>
            <Image
              source={require("../images/dhiraj.jpg")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
        <Card
          title="SHARDA BHARTI"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>UX Designer.</Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>shardabharti.kri@gmail.com</Text>
            </View>
            <Image
              source={require("../images/shanu.jpeg")}
              style={{
                width: 90,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>
      </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  desk: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "600",
    color: "#dc143c",
    marginBottom:10
  },
  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row"
  }
});
