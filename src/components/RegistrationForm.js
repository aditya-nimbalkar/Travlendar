import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TextInput, Button } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';


import awsconfig from '../aws-exports';
// import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);

type Props = {};

class RegistrationForm extends Component {
  state = {
    authCode: ''
  }

  onChangeText(value) {
    this.setState({
      authCode: value
    });
  }

  signUp() {
    Auth.signUp({
      username: 'adityanimbalkar3429@gmail.com',
      password: 'Password@123',
      attributes: {
        email: 'adityanimbalkar3429@gmail.com'
        // phone: ''
      }
    })
    .then(res => {
      console.log('SIGNED UP!', res)
    })
    .catch(err => {
      console.log('ERR: ', err)
    })
  }

  verify() {
    console.log(this.state.authCode)
    Auth.confirmSignUp('adityanimbalkar3429@gmail.com', this.state.authCode)
    .then(res => {
      console.log('CONFIRM SIGNED UP!', res)
    })
    .catch(err => {
      console.log('CONFIRM ERR: ', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          TRAVLENDAR SIGNUP PAGE!
        </Text>
        <Button
          title="Sign Up"
          onPress={this.signUp.bind(this)}
        />
        <TextInput
        style={styles.input}
        onChangeText={value => this.onChangeText(value)}
        placeholder='code'
        />
        <Button
          title="Confirm Code"
          onPress={this.verify.bind(this)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default RegistrationForm;
