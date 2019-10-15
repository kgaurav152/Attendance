import React, {Component} from 'react';
import {
    View,
    StyleSheet,
   Text,
  Platform,
  Picker,
  Button
} from 'react-native';
import Colors from '../constants/Colors';

class Dashboard extends Component {
    state = {user: ''}
    updateUser = (user) => {
       this.setState({ user: user })
    }
    state ={batch: ''}
    updateBatch =(batch)=>{
        this.setState({batch: batch})
    }
    state ={semester: ''}
    updateSemester=(semester)=>{
        this.setState({semester:semester})
    }
    state ={subject: ''}
    updateSubject =(subject)=>{
        this.setState({subject:subject})
    }
    render() {
       return (
          <View>
              <Text style={{fontSize:25,marginLeft:'18%'}}>Select Branch</Text>
             <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                <Picker.Item label = "Civil Engineering" value = "Civil Engineering." />
                <Picker.Item label = "Mechanical Engineering" value = "Mechanical Engineering." />
                <Picker.Item label = "Computer Sc. and Engg." value = "Computer Sc. and Engg." />
             </Picker>
             <Text style = {styles.text}>{this.state.user}</Text>

             <Text style={{fontSize:25,marginLeft:'18%'}}>Select Batch</Text>
             <Picker selectedValue = {this.state.batch} onValueChange = {this.updateBatch}>
                <Picker.Item label = "2016-20" value = "2016-20" />
                <Picker.Item label = "2017-21" value = "2017-21" />
                <Picker.Item label = "2018-22" value = "2018-22" />
                <Picker.Item label = "2019-23" value = "2019-23" />
             </Picker>
             <Text style = {styles.text}>{this.state.batch}</Text>

             <Text style={{fontSize:25,marginLeft:'18%'}}>Select Semester</Text>
             <Picker selectedValue = {this.state.semester} onValueChange = {this.updateSemester}>
                <Picker.Item label = "1st" value = "1st" />
                <Picker.Item label = "2nd" value = "2nd" />
                <Picker.Item label = "3rd" value = "3rd" />
                <Picker.Item label = "4th" value = "4th" />
                <Picker.Item label = "5th" value = "5th" />
                <Picker.Item label = "6th" value = "6th" />
                <Picker.Item label = "7th" value = "7th" />
                <Picker.Item label = "8th" value = "8th" />
             </Picker>
             <Text style = {styles.text}>{this.state.semester}</Text>

             <Text style={{fontSize:25,marginLeft:'18%'}}>Select Subject</Text>
             <Picker selectedValue = {this.state.subject} onValueChange = {this.updateSubject}>
                <Picker.Item label = "Operating System" value = "Operating System" />
                <Picker.Item label = "Computer Networks" value = "Computer Networks" />
                <Picker.Item label = "Design and Analysis of Algorithm" value = "Design and Analysis of Algorithm" />
                <Picker.Item label = "Database Management System" value = "Database Management System" />
                <Picker.Item label = "Microprocessor amd Its Applications" value = "Microprocessor amd Its Applications" />
                
             </Picker>
             <Text style = {styles.text}>{this.state.subject}</Text>
             <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={() =>props.navigation.navigate({
            routeName: 'Students'
          }) } />
          </View>
          </View>
       )
    }
 }
Dashboard.navigationOptions = {
    headerTitle: 'Dashboard',
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  };
  export default Dashboard
  const styles = StyleSheet.create({
    text: {
       fontSize: 15,
       alignSelf: 'center',
       color: 'red'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems :'center',
        marginLeft:'35%',
        marginTop:'8%'
      },
 })