import React,{Component} from 'react'
import { StyleSheet, Text, TextInput, View, Button,Image, TouchableHighlight} from 'react-native'

export default class SignUp extends Component {
  state = { email: '', password: '',name:"", department:"", errorMessage: null }

render() {
  return (
    <View style={styles.container}>
<View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={require('../images/name.png')}/>
        <TextInput style={styles.inputs}
            placeholder="Name"
            keyboardType="default"
            underlineColorAndroid='transparent'
            onChangeText={(name) => this.setState({name})}
            value ={this.state.name}
            />
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={require('../images/department.jpg')}/>
        <TextInput style={styles.inputs}
            placeholder="Department"
            keyboardType="autoCapitalizie"
            underlineColorAndroid='transparent'
            onChangeText={(department) => this.setState({department})}
            value ={this.state.department}
            />
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={require('../assets/mailIcon.jpg')}/>
        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}
            value ={this.state.email}
            />
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={require('../assets/pwdIcon.png')}/>
        <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            />
      </View>
      <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.onClickListener('login')}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableHighlight>
      <View style={styles.fixTotext}>
      <TouchableHighlight>
          <Text style={styles.loginButton}>Have an account ?</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.loginButton, styles.loginText}>Login Here</Text>
      </TouchableHighlight>
      </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContainer: {
      borderBottomColor: '#fff8dc',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  registerButton: {
    backgroundColor: "#00b5ec",
  },
  registerText: {
    color: 'white',
  },

  loginButton:{
    marginLeft:22,
    fontWeight:'900',
    color:'#00ffff',
    fontSize:17
  },
  loginText:{
    textAlign:'center',
    fontWeight:'900',
    color:'#deb887',
    fontSize:17,
    marginLeft:12,
    paddingTop:5
}
})
