/*Example of Navigation Drawer with Sectioned Menu*/
 
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
class SideMenu extends Component {
  constructor() {
    super();
    /*Array of the sidebar navigation option with 
    Heading, Subheading and screen to navigate.*/
    //Sreen to navigate can be any screen defined in Drawer Navigator in App.js
    this.options = [
      
      {
        mainHeading: 'Katihar Engineering College, Katihar',
        subOptions: [
          { secondaryHeading: 'Home', navigationPath: 'Home' },
          { secondaryHeading: 'Developers Info', navigationPath: 'Developers' },
          { secondaryHeading: 'Assign Subject', navigationPath: 'AssignSubject' },
          { secondaryHeading: 'About College', navigationPath: 'KEC_Katihar' },
          { secondaryHeading: 'SignUp', navigationPath: 'SignUp' },
          { secondaryHeading: 'Admin', navigationPath: 'Admin' }

        ],
      },
    ];
  }
 
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };
 
  render() {
    return (
      
      <View style={styles.container}>
      
        <ScrollView>
          <View>
            {this.options.map((option,i) => (
              <View key={i}>
                <Text style={styles.mainHeading}>{option.mainHeading}</Text>
                {option.subOptions.map((item, key) => (
                  <View style={styles.secondaryHeading} key={key}>
                    <Text onPress={this.navigateToScreen(item.navigationPath)}>
                      {item.secondaryHeading}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
        
      </View>
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  secondaryHeading: {
    padding: 10,
    fontWeight:'800',
    fontSize:30,
    color:'#fffff0'
    
  },
  mainHeading: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'lightgrey',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
});
 
export default SideMenu;