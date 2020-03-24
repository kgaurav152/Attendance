import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class CollegeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                
                <Image style={styles.avatar} source={require('../images/logo.jpg')}/>
                
            </View>
          </View>



          <ScrollView style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.props.navigation.navigate("HomeScreen")}
              >
                <Text style={styles.loginText}>Click Here to visit Website</Text>
              </TouchableHighlight> 
              
                
              <Text style={styles.description}>
                With the advent of technology and the emergence of notable education
                   in our society, had decided to adapt the prevailing need of light.
                    In the mission to achieve the eminence in the field, the establishment 
                    of Katihar Engineering College was laid in the year 2016.
                     The college is enriched with a pollyannaish environment, 
                     highly motivated and enthusiastic students guided 
                     by well qualified professional from different prestigious colleges of our country.
                      The college was established with three branches- Civil Engineering,
                       Mechanical Engineering and Computer Science and Engineering. 
                       Each branch has a number of renowned professors with high qualifications
                        and experience in teaching or their respective industries. 
                        The college consists of a central library, Computer Labs, 
                        Training and Placement Cell, Programmer's Club etc,
                         with the exceptional support staffs and infrastructure.
                          All the labs and other infrastructure is in highly conditional states
                           serving at their best to provide the best facilities to all the members 
                           of the college. Student of the college have exhibited their skill at different
                            platform and gathered many awards from premium institutes.
                             It is situated 3 km from Katihar Railway Station and there is a good transportation
                              facility available from there. </Text>
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00CED1",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  
  title:{
    fontSize:20,
    color: "#00CED1"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    //marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00CED1",
  },
  description:{
    fontSize:15,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'justify'
  },
});