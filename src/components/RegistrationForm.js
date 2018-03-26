import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';


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
            authcode: '' };

  onSignUpFail() {
    console.log('Inside Failure function!');
    this.setState({ error: 'Registration Failed.',
    loadingSignUp: false,
    loadingVerify: false, });
  }

  onSignUpSuccess() {
    console.log('Inside Success function!');
    this.setState({
      // email: '',
      // username: '',
      password: '',
      error: '',
      loadingSignUp: false,
      loadingVerify: false,
      authcode: ''
    });
  }

  signUp() {
    const { email, username, password } = this.state;

    this.setState({ error: '', loadingSignUp: true });

    Auth.signUp({
      // username: username,
      // password: password,
      username,
      password,
      attributes: {
        // email: email
        email
        // phone: ''
      }
    })
    // .then(res => {
    //   console.log('SIGNED UP!', res);
    //   this.onSignUpSuccess.bind(this);
    // })
    // .catch(err => {
    //   console.log('ERR: ', err);
    //   this.onSignUpFail.bind(this);
    // });
    .then(this.onSignUpSuccess.bind(this))
    .catch(this.onSignUpFail.bind(this));
  }

  verify() {
    // console.log(this.state.authCode);
    const { username, authcode } = this.state;

    this.setState({ loadingVerify: true });

    Auth.confirmSignUp(username, authcode)
    // .then(res => {
    //   console.log('CONFIRM SIGNED UP!', res);
    //   this.onSignUpSuccess.bind(this);
    // })
    // .catch(err => {
    //   console.log('CONFIRM ERR: ', err);
    //   this.onSignUpFail.bind(this);
    // });
    .then(this.onSignUpSuccess.bind(this))
    .catch(this.onSignUpFail.bind(this));
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

  renderVerifyButton() {
    if (this.state.loadingVerify) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.verify.bind(this)}>
        Confirm Sign Up!
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

        <Card>
          <Card>
            <CardSection>
              <Input
                placeholder='user@domain.com'
                label='Email'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </CardSection>

            <CardSection>
              <Input
                placeholder='username'
                label='Username'
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
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

          <Card>
            <CardSection>
              <Input
                placeholder='Authentication Code'
                label='AuthCode'
                value={this.state.authcode}
                onChangeText={authcode => this.setState({ authcode })}
              />
            </CardSection>

            <CardSection>
              { this.renderVerifyButton() }
            </CardSection>
          </Card>
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
    backgroundColor: '#368ce7'
  },
};

export default RegistrationForm;
