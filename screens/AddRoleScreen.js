import React,{Component,useCallback,useReducer} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import * as userActions from '../actions/user'
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Card from '../components/Card';

const AddRole = props => {
   
    const userId = props.navigation.getParam('userId')
    const email = props.navigation.getParam('email')

    let data = [{
        value: 'Admin',
      }, {
        value: 'Faculty',
      }, {
        value: 'Student',
      }];
      const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

      const formReducer = (state, action) => {
        if (action.type === FORM_INPUT_UPDATE) {
          const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
          };
          const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
          };
          let updatedFormIsValid = true;
          for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
          }
          return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
          };
        }
        return state;
      };
      
      
        const dispatch = useDispatch();
      
        const [formState, dispatchFormState] = useReducer(formReducer, {
          inputValues: {
            userId: '',
            email: '',
            role:''
          },
          inputValidities: {
            userId: false,
            email: false,
            role: false
          },
          formIsValid: false
        });
      
        const addRoleHandler = () => {
          dispatch(
            userActions.createUser(
              formState.inputValues.userId,
              formState.inputValues.email,
              formState.inputValues.role
            )
          );
          props.navigation.navigate(
            {
              routeName:'Home',
            });
        };
      
        const inputChangeHandler = useCallback(
          (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
              type: FORM_INPUT_UPDATE,
              value: inputValue,
              isValid: inputValidity,
              input: inputIdentifier
            });
          },
          [dispatchFormState]
        );
      return (
        <View style={styles.container}>
        <Dropdown style={styles.dropdownStyle}
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
   
AddRole.navigationOptions = (navigationData) => {
    const userId = navigationData.navigation.getParam('userId');
    const email = navigationData.navigation.getParam('email');
    return{
        headerTitle: email
    };
};



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
      dropdownStyle: {
        width: 250
      },
    })      
export default AddRole