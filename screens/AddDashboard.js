import React from 'react';
import { View, Text, StyleSheet, TextInput, Button,Image,Platform,  } from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
const AddDashboard = props => {
 
    return (
      <View style={styles.screen}>          
        <Card style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Add Student" onPress={() =>props.navigation.navigate({
              routeName: 'AddStudent'
            }) } />
          </View>
        </Card>
        <Card style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Add Faculty" onPress={() =>props.navigation.navigate({
              routeName: 'AddFaculty'
            }) } />
          </View>
        </Card>
      </View>
    );
  };
 
  AddDashboard.navigationOptions = {
    headerTitle: 'Katihar Engg. College, Katihar',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }; 
  

    
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingLeft:5
      
    },
  
    inputContainer: {
      marginTop:'10%',
      maxWidth: '100%',
      alignItems: 'center',
      padding:'6%',
      marginLeft:'20%',
      marginRight:'20%'
      
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems :'center',
      marginLeft:'35%',
      
    },
    logo :{
      width: 100,
      height: 80,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      alignItems:'center',
      marginLeft:'35%'
      
  
    },
    InputBox :{
      fontSize:15,
      marginBottom:'2%',
      
      
    }
  });
  
  export default AddDashboard;
  