import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Button,
  Linking,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';

export default class Login extends Component {
  registerDevice() {
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.alfred}>
          <TouchableOpacity style={styles.buttonContainer} onPress={ ()=>{ Linking.openURL('https://www.travlendar.com/home')}} >
            <Text style={styles.buttonText}>NEW USER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/travlendar_logo.png')}
            />
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF'
  },
  alfred: {
    padding: 20
  },
  buttonContainer: {
      backgroundColor: '#0984e3',
      paddingVertical: 15,
      paddingHorizontal: 10,
      alignSelf: 'flex-end'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 300,
    height: 100
  },
  title: {
    color: 'black',
    marginTop: 30,
    width: 300,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.5
  }
});
