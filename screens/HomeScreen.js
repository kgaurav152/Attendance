import React, {Component} from "react";
import { StyleSheet, View, SafeAreaView, Text, Alert, ShadowPropTypesIOS} from "react-native";
import Constants from "expo-constants";
import LoginScreen from './LoginScreen'
import { Icon, Button } from "react-native-elements";
import { setRecoveryProps } from "expo/build/ErrorRecovery/ErrorRecovery";
import { render } from "react-dom";
<<<<<<< HEAD
import DeveloperScreen from '../screens/DeveloperScreen';
=======







>>>>>>> a9467b78f508007fdb6f5fbd72609f28af423a83
function Separator() {
  return <View style={styles.separator} />;
}

export default class Homescreen extends Component  {
  render() {
    const {navigate} = this.props.navigation;
    return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Online Attendance System</Text>
        <View style={styles.fixToText}>
          <Button
          onPress={() => {
            navigate('Login',{name: 'Login'})
          }}
            titleStyle={{
              color: "#fffaf0",
              fontSize: 23,
              fontWeight:'bold'
            }}
            buttonStyle={{
              backgroundColor: "#3498db",
              borderRadius: 10,
              flex: 1,
              height: 70,
              width: 150,
              marginBottom: 10
            }}
            title="Login"
          />

          <Button
            onPress={() => Linking.openURL('http://keck.ac.in')}
            titleStyle={{
              color: "#fffff0",
              fontSize: 20,
              fontWeight:'700'
            }}
            buttonStyle={{
              backgroundColor: "#cd5",
              borderRadius: 10,
              flex: 1,
              height: 70,
              width: 150,
              marginLeft: 10,
              marginBottom: 10
            }}
            title="KEC Katihar "
          />
        </View>
      </View>
      <Separator />
      <View>
        <View style={styles.fixToText}>
          <Button
            onPress={() => this.props.navigation.navigate('Developers')}
            titleStyle={{
              color: "#fffaf0",
              fontSize: 23
            }}
            buttonStyle={{
              backgroundColor: "#dcdcdc",
              borderRadius: 10,
              flex: 1,
              height: 70,
              width: 150,
              marginTop: 10
            }}
            title="Developers"
          />
          <Button
            onPress={() => Alert.alert("About the App")}
            titleStyle={{
              color: "#334",
              fontSize: 23
            }}
            buttonStyle={{
              backgroundColor: "#20b2aa",
              borderRadius: 10,
              flex: 1,
              height: 70,
              width: 150,
              marginLeft: 10,
              marginTop: 10
            }}
            title="About"
          />
        </View>
        <Text style={styles.footer}>{'\u00A9'} 2020 KEC Katihar</Text>
      </View>
    </SafeAreaView>
  );
  }
  
<<<<<<< HEAD
});
const DeveloperScreen_StackNavigator = createStackNavigator({
  Developers: {
    screen: DeveloperScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Demo Screen 2",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: "#fff"
    })
  }
  
});
=======
          
}
>>>>>>> a9467b78f508007fdb6f5fbd72609f28af423a83

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
    
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    marginBottom: 30,
    fontSize: 20,
    color: "#008b8b",
    fontWeight: "bold"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 130,
    width: 300,
    textAlign: "center",
    marginLeft: 15
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftButton: {
    textAlign: "center",
    fontSize: 21
  },
  footer :{
    fontWeight:'900',
    fontSize:22,
    color: '#7b68ee',
    textAlign:'center',
    marginTop:40,

  }
});

