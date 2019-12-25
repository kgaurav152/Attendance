


import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {createStore, combineReducers} from 'redux';
import LoginNavigator from './navigation/LoginNavigator';
import ReduxThunk from 'redux-thunk'; 
import {Provider} from 'react-redux';
import studentReducers from './userDetails/reducers/student'
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
const rootReducer = combineReducers ({
  students:studentReducers
});
const store =createStore(rootReducer)
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <Provider store ={store}>
      <LoginNavigator/>
      </Provider>
    );
  }
}
