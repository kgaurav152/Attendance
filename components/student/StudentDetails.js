import React from 'react';
import {View,Text,StyleSheet} from 'react-native'

const StudentDetails = props=>{
    return <View style ={styles.student}>
        <Text>{props.name}</Text>
        <Text>{props.department}}</Text>
        <Text>${props.reg_no.toFixed(12)}}</Text>
        <View>
            <Button title="Submt" onPress={props.onSubmit}/> //Function for submit
        </View>
        </View>
};

const styles =StyleSheet.create({
    student : {
            shadowColor:'black',
            shadowOpacity:0.26,
            shadowOffset:{width:0, height:2},
            shadowRadius:5,
            borderRadius:10,
            backgroundColor:'white',
            elevation:5,
            height:300,
            margin:20

    }

});

export default StudentDetails;