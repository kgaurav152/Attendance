import React from 'react';
import { View, Text, StyleSheet, TextInput, Button,Image,Platform,  } from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { NavigationEvents } from 'react-navigation';

const Welcome = props => {
  return (
    <View style={styles.screen}>
       
      
      <Image style={styles.logo}
          source={{uri: 'http://www.keck.ac.in/sites/default/files/logo1.jpeg'}}
        />
        <Text style={{fontSize:25,marginLeft:'18%'}}>Welcome To Online Attendance System</Text>
        <Text style={{fontSize:20,marginLeft:'8%',marginTop:'2%'}}>Please Login to Make Attendance</Text>
        
      <Card style={styles.inputContainer}>
      <Text style={styles.InputBox}>User Name :</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      /> 
      <Text  style={styles.InputBox}>Password :</Text><TextInput secureTextEntry={true} style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() =>props.navigation.navigate({
            routeName: 'Dashboard'
          }) } />
          
        </View>
      </Card>
    </View>
  );
};
Welcome.navigationOptions = {
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
    marginTop:'5%',
    maxWidth: '100%',
    alignItems: 'center'
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

export default Welcome;
