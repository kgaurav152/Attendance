import React,  { useState,useReducer, useCallback,useEffect }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
  
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import * as authActions from '../actions/auth';
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

const Login = props => {
  const dispatch = useDispatch();
  
  const [error, setError] = useState();
  


  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const loginHandler = async () => {
    let action;
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    
    
    try{
       dispatch(action);
      //props.navigation.navigate('WelcomeUser');
    }
    catch (err) {
      setError(err.message);
     
      
    }
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
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../assets/mailIcon.jpg')}/>
          <Input style={styles.inputs}
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              emailid="email"
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />  
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../assets/pwdIcon.png')}/>
          <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
        </View>

        <View style={styles.buttonContainer}>
              <Button
                title="Login"
                
                onPress={loginHandler}
              />
            </View>
        <View style={styles.fixTotext}>
          <TouchableHighlight
            onPress={() => this.onClickListener("restore_password")}
          >
            <Text style={styles.forgotButton}>Forgot Password?</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.registerButton}>Register.</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  fixTotext: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  forgotButton: {
    marginRight: 40,
    fontWeight: "900",
    color: "#00ffff",
    fontSize: 17
  },
  registerButton:{
    marginLeft:40,
    fontWeight:'900',
    color:'#00ffff',
    fontSize:17
  }
})
export default Login
