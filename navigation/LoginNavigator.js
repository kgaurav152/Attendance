
import React from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import AddDashboard from '../screens/AddDashboard';
import SummaryDashboard from '../screens/SummaryDashboard';
import AddStudentScreen from '../screens/AddStudentScreen'
import {Ionicons} from '@expo/vector-icons'
import EditStudentScreen from '../screens/EditStudentScreen';

const AddDashboardNavigator = createBottomTabNavigator({
  AddDashboard :{
    screen:AddDashboard,
    navigationOptions :{
      tabBarIcon: tabInfo=>{
        return (
          <Ionicons
          name ="md-add"//only for testing
          size={20}
          />
        );
      }
    }
  },
  
  SummaryDashboard :SummaryDashboard,

});

const MainNavigator = createStackNavigator({
  Login :LoginScreen,
  AddDashboard :AddDashboardNavigator,
  AddStudent: AddStudentScreen,
  
  
})

export default createAppContainer(MainNavigator);
