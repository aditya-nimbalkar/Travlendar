import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { StackNavigator } from 'react-navigation';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');

type Props = {};

class RegistrationForm extends Component {
  state = { email: '',
            password: '',
            error: '',
            loadingSignUp: false,
            loadingVerify: false,
            loadingResend: false,
            authcode: '' };

  static navigationOptions = {
    // title: 'Registration',
    header: null,
  }




  onFailure() {
    // console.log('Inside Failure function!');
    this.setState({
    // error: 'Registration Failed.',
    loadingSignUp: false,
    loadingVerify: false,
    loadingResend: false });
  }

  onSuccess() {
    // console.log('Inside Success function!');
    this.setState({
      // email: '',
      // password: '',
      error: '',
      loadingSignUp: false,
      loadingVerify: false,
      loadingResend: false,
      authcode: ''
    });
  }

  signUp() {
    const { email, password } = this.state;

    this.setState({ error: '', loadingSignUp: true });

    Auth.signUp({
      username: email,
      password,
      attributes: {
        // email: email
        email
        // phone: ''
      }
    })
    .then(res => {
      console.log('SIGNED UP!', res);
      this.onSuccess();
      this.props.navigation.navigate('CodeVerification', { email: this.state.email });
    })
    .catch(err => {
      console.log('ERR: ', err);
      // console.log(err.message)
      if (typeof err !== null && typeof err === 'object') {
          // this.setState({ error: 'Registration Failed.' });
          this.setState({ error: err.message });
      } else {
          this.setState({ error: err });
      }
      // this.setState({ error: err });
      this.onFailure();
    });
  }

  renderSignUpButton() {
    if (this.state.loadingSignUp) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.signUp.bind(this)}>
        Sign Up!
      </Button>
    );
  }

  render() {
    return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={imgSrc}
          />
        </View>

        <TouchableOpacity style={ { padding: 10 } } onPress={() => this.props.navigation.navigate('LoginForm')}>
            <Text style={styles.linkTextStyle}>
              Existing User? Login Here!
            </Text>
        </TouchableOpacity>

        <Card>
          <CardSection>
            <Input
              autoFocus
              autoCapitalize='none'
              placeholder='user@domain.com'
              label='Email'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              placeholder='password'
              label='Password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            { this.state.error }
          </Text>

          <CardSection>
            { this.renderSignUpButton() }
          </CardSection>
        </Card>

      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  linkTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'deepskyblue',
    textDecorationLine: 'underline'
  },
  logo: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 330,
    height: 120
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
};

export default RegistrationForm;
