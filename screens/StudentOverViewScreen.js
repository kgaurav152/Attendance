import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import StudentComponent from '../components/StudentComponent';



import firebase from '../components/config';
let studentRef = firebase.database().ref('student/');

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      justifyContent: 'center',
      backgroundColor: 'white',
    }
  })

export default class StudentOverViewScreen extends Component {

    state = {
        student: []
    }

   componentDidMount() {
        studentRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let student = Object.values(data);
            this.setState({student});
         });
    }
    
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.student.length > 0
                    ? <StudentComponent student={this.state.student} />
                    : <Text>No Students</Text>
                }
            </View>
        )
    }
}