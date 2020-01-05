import React from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';



const MainNavigator = createStackNavigator({
  Login :LoginScreen,
  HomeScreen:HomeScreen
  
})

export default createAppContainer(MainNavigator);
