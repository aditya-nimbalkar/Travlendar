import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          />
        <TextInput
          placeholder="Enter Username"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          returnKeyType="go"
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          />

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer} onPress={ ()=>{ Linking.openURL('https://www.travlendar.com/home')}}>
            <Text style={styles.linkText}>New User? Register Here</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 50,
    backgroundColor: '#74b9ff',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 15
  },
  buttonContainer: {
      backgroundColor: '#0984e3',
      paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  linkContainer: {
      padding: 15,
  },
  linkText: {
    textAlign: 'center',
    color: "#3742fa",
    fontWeight: '500',
    fontSize: 15
  }

});
