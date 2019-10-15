import React from 'react';
import { View, Text, StyleSheet, TextInput, Button,Image,Platform,ScrollView  } from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { NavigationEvents } from 'react-navigation';

const Login = props => {
  return (
    <ScrollView style={styles.screen}>
       
      
      
      <Card style={styles.inputContainer}>
      <Text style={styles.InputBox}>Full Name :</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      /> 
      <Text  style={styles.InputBox}>Registration No:</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text  style={styles.InputBox}>Branch:</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text  style={styles.InputBox}>Sessions:</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text  style={styles.InputBox}>Mobile No:</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text style={styles.InputBox}> Address Line 1</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text style={styles.InputBox}> Address Line 2</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text style={styles.InputBox}> Address Line 3</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text style={styles.InputBox}> PIN</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text style={styles.InputBox}> City</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
      <Text style={styles.InputBox}> State</Text><TextInput style={{ width :'60%',height: 40, borderColor: 'gray', borderWidth: 2 }}
      />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={() =>props.navigation.navigate({
            routeName: 'AddAttendance'
          }) } />
          
        </View>
      </Card>
    </ScrollView>
  );
};
Login.navigationOptions = {
    headerTitle: 'Add Students',
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

export default Login;
