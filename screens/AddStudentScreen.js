
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Text,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import firebase from '../components/config';
import Form from 'react-native-form'

export default class AddStudentScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
     };
     this.itemsRef = firebase.database().ref().child(`student`)
  }

  pushToFirebase() {
    let formValues = this.refs.soulForm.getValues()
    this.itemsRef.push(formValues)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter the details of Student here
        </Text>
        <Text style={styles.text}>
          Add Student
        </Text><Text></Text><Text></Text>
        <Form ref="soulForm" style={styles.form} >
          <Item floatingLabel style={{marginTop:10}}>
            <Label style={{marginLeft: 15}}>Name</Label>
            <Input style={{marginLeft: 25}} name="name" type="TextInput" />
          </Item>
          <Item floatingLabel style={{marginTop:10}}>
            <Label style={{marginLeft: 15}}>Department</Label>
            <Input style={{marginLeft: 25}} name="department" type="TextInput" />
          </Item>
          <Item floatingLabel style={{marginTop:10}}>
            <Label style={{marginLeft: 15}}>Reg No</Label>
            <Input style={{marginLeft: 25}} name="reg_no" type="TextInput" />
          </Item>
            <Button Block primary onPress={() => this.pushToFirebase()} style={styles.button}><Text>Save</Text></Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  form: {
    width: '80%'
  },
  button: {
    margin: 10
  }
});
