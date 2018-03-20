import React, { Component } from 'react';
import { Text } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';


import awsconfig from './src/aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig)

type Props = {};

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false, authcode: '' };

  onSignUpFail() {
    this.setState({ error: 'Registration Failed.', loading: false });
  }

  onSignUpSuccess() {
    this.setState({
      // email: '',
      // username: '',
      password: '',
      error: '',
      loading: false,
      authcode: ''
    });
  }

  signUp() {
    const { email, username, password } = this.state;

    this.setState({ error: '', loading: true });

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
    .then(res => {
      console.log('SIGNED UP!', res);
      this.onSignUpSuccess.bind(this);
    })
    .catch(err => {
      console.log('ERR: ', err);
      this.onSignUpFail.bind(this);
    });
  }

  verify() {
    // console.log(this.state.authCode);
    const { username, authcode } = this.state;

    this.setState({ loading: true });

    Auth.confirmSignUp(username, authcode)
    .then(res => {
      console.log('CONFIRM SIGNED UP!', res);
      this.onSignUpSuccess.bind(this);
    })
    .catch(err => {
      console.log('CONFIRM ERR: ', err);
      this.onSignUpFail.bind(this);
    });
  }

  renderSignUpButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.signUp.bind(this)}>
        Sign Up!
      </Button>
    );
  }

  renderVerifyButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.verify.bind(this)}>
        Sign Up!
      </Button>
    );
  }

  render() {
    return (
      // <View>
      //   <Text>
      //     WELOCOME TUOA REACT ANTIVE HELLBVBCMNADBNCBSAMBCNSM
      //   </Text>
      // </View>
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
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
