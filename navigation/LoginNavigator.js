
import React from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';



const MainNavigator = createStackNavigator({
  Login :LoginScreen,
  
})

export default createAppContainer(MainNavigator);
