import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';

// we will use these two screens later in our AppNavigator
import AddItem from './screens/AddItem';
import List from './screens/List';

const AppNavigator = createStackNavigator(
  {
    Home,
    AddItem,
    List
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}