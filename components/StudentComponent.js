import React, { Component } from 'react';
import {Text, StyleSheet, ScrollView, View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button';
import {CheckBox} from 'react-native-elements';
import firebase from '../components/config';
import Form from 'react-native-form';
import {  Button,} from 'native-base';
import DatePicker from 'react-native-datepicker'
const styles = StyleSheet.create({
    itemsList: {
        flex:0.8,
        
        
    },
    itemtext: {
        fontSize: 18,
        
        textAlign: 'left',
    }
});

export default class StudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {date:null, focused:null
            
         };
         this.attendanceRef = firebase.database().ref().child(`attendance`)
      }
    
      pushToFirebase() {
        let formValues = this.refs.attendanceForm.getValues()
        this.attendanceRef.push({formValues, date: this.state.date})
        
        
      }
      
  static propTypes = {
      student: PropTypes.array.isRequired
  };
  onSelect(index, value){
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }
 

  render() {
    return (
      <View style={styles.itemsList}>
         
          <Text style={styles.itemtext}>Attendance
                    <Text style={styles.itemtext}>  Registration No</Text>
                    
                    </Text>
                    <Form ref="attendanceForm">
                    <DatePicker
          style={{width: 200, marginBottom: 7}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD" 
            onDateChange={(date) => {this.setState({date: date})}}
          />         
                    
        {this.props.student.map((student, index) => {
            return (
                <ScrollView key={index}>

<RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)}
      >
        <RadioButton value={'present'} name ="attendance" type="TextInput" >
            <Text style={styles.itemtext} name ='reg_no' type ="TextInput" value={student.reg_no}>                 {student.reg_no}</Text>
        </RadioButton></RadioGroup>
  
                </ScrollView>
            )
            
        })}
         <Button Block primary onPress={() => this.pushToFirebase()} style={styles.button}><Text>Save</Text></Button>
       </Form>
      </View>
    );
  }
}