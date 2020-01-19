import React,{Component} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

const addRoleHandler = props => {
    
        const userId = props.navigation.getParam('userId')
        const email = props.navigation.getParam('email')
    

    console.log(userId);
    console.log(email);
} 
class AddRole extends Component {
   render(){ 
    let data = [{
        value: 'Admin',
      }, {
        value: 'Faculty',
      }, {
        value: 'Student',
      }];
     
      return (
        <View style={styles.container}>
        <Dropdown
          label='Add Role'
          data={data}
        />
        
            <View style={styles.buttonContainer}>
              <Button
                title="Add Role"
                
                onPress={addRoleHandler}
              />
            </View>
        </View>    
      );
    }  

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
    buttonContainer: {
        height:45,
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },
    })      
export default AddRole