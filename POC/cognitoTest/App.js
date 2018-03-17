
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig)

type Props = {};
export default class App extends Component<Props> {

  state = {
    authCode: ''
  }

  onChangeText(value) {
    this.setState({
      authCode: value
    });
    // console.log(this.state)
    // console.log("VALUE: ",value);
    // console.log("AUTHCODE: ", {this.state.authcode})
  }
  signUp() {
    Auth.signUp({
      username: 'CognitoTest1',
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
    Auth.confirmSignUp('CognitoTest1', this.state.authCode)
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
          Welcome to React Native!
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
        <Text style={styles.welcome}>
          Registered Users Sign In!
        </Text>
        <TextInput
        style={styles.input}
        onChangeText={value => this.onChangeText(value)}
        placeholder='Username'
        />
        <TextInput
        style={styles.input}
        onChangeText={value => this.onChangeText(value)}
        placeholder='Password'
        />
        <Button
          title="Sign In"
          onPress={this.signUp.bind(this)}
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
