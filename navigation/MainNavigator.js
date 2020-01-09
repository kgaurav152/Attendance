import React from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';



const MainNavigator = createStackNavigator({

  HomeScreen:HomeScreen
  
})

export default createAppContainer(MainNavigator);
