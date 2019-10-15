import React from 'react';
import { View, Text, StyleSheet, TextInput, Button,Image,Platform,  } from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
const SummaryDashboard = props => {
 
    return (
      <View style={styles.screen}>          
        <Card style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Add Student" onPress={() =>props.navigation.navigate({
              routeName: 'AddStudent'
            }) } />
          </View>
        </Card>
        
      </View>
    );
  };
 
  SummaryDashboard.navigationOptions = {
    headerTitle: 'Katihar Engg. College, Katihar',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }; 
  

    
  
  const styles = StyleSheet.create({
    screen: {
      
      flex: 1,
      padding: 10,
      
    },
  
    inputContainer: {
      marginTop:'10%',
      maxWidth: '70%',
      alignItems: 'center',
      marginLeft:'5%'
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems :'center',
      marginLeft:'70%',
      marginTop:'5%'
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
  
  export default SummaryDashboard;
  