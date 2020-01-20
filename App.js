import React, { useState } from "react";

import * as Font from "expo-font";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Button
} from "react-native";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {AppLoading} from 'expo'
import reducer from './reducers/auth'
import ActionBarImage from "./components/ActionBarImage";


import MainNavigator from "./navigation/MainNavigator";


const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return( 
    <Provider store={store}>
        <MainNavigator/>
    </Provider>
  )
  
}
