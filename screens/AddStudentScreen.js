import React, { useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import * as student from '../userDetails/actions/student';
import Input from '../components/Input';

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

const EditStudentScreen = props => {
  const studId = props.navigation.getParam('StudentId');
  const editedStudent = useSelector(state =>
    state.Students.userStudents.find(stud => stud.id === studId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(student.fetchStudents());
  },[dispatch]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: editedStudent ? editedStudent.name : '',
      department: editedStudent ? editedStudent.department : '',
      reg_no: editedStudent ? editedStudent.reg_no : ''
    },
    inputValidities: {
      name: editedStudent ? true : false,
      department: editedStudent ? true : false,
      reg_no: editedStudent ? true : false
    },
    formIsValid: editedStudent ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (editedStudent) {
      dispatch(
        student.updateStudent(
          studId,
          formState.inputValues.name,
          formState.inputValues.department,
          formState.inputValues.reg_no
        )
      );
    } else {
      dispatch(
        student.createStudent(
          formState.inputValues.name,
          formState.inputValues.department,
          formState.inputValues.reg_no
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, studId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <TextInput
            id="name"
            label="Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedStudent ? editedStudent.name : ''}
            initiallyValid={!!editedStudent}
            required
          />
          <TextInput
            id="department"
            label="Department"
            errorText="Please enter department!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedStudent ? editedStudent.department : ''}
            initiallyValid={!!editedStudent}
            required
          />
          <TextInput
            id="reg_no"
            label="Registration No"
            errorText="Please enter a valid Registration no!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedStudent ? editedStudent.reg_no : ''}
            initiallyValid={!!editedStudent}
            required
            maxLength={11}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditStudentScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('StudentId')
      ? 'Edit Student'
      : 'Add Student',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default EditStudentScreen;
