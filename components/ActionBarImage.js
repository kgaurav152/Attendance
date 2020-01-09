
import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image } from 'react-native';
 
export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
        
            source={require('../images/logo1.jpeg')}
            
          
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            marginLeft: 10,
            marginRight:30,
          }}
        />
      </View>
    );
  }
}