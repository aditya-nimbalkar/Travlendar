import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');

type Props = {};

class CodeVerification extends Component {

  state = { email: '',
            authcode: '',
            error: '',
            loadingVerify: false,
            loadingResend: false,
          };

  static navigationOptions = {
    // title: 'Verify Authentication Code',
    header: null,
  }


  componentWillMount() {
    const { params } = this.props.navigation.state;
    const email = params ? params.email: null;
    this.setState({ email: email? email: this.email });
  }

  onFailure() {
    // console.log('Inside Failure function!');
    this.setState({ error: 'Verification Failed',
    loadingVerify: false,
    loadingResend: false });
  }

  onSuccess() {
    // console.log('Inside Success function!');
    this.setState({
      // email: '',
      // password: '',
      error: '',
      loadingVerify: false,
      loadingResend: false,
      authcode: ''
    });
  }

  verify() {
    const { email, authcode } = this.state;
    this.setState({ loadingVerify: true });

    Auth.confirmSignUp(email, authcode)
    .then(res => {
      console.log('CONFIRM SIGNED UP!', res);
      this.onSuccess();
      this.props.navigation.navigate('LoginForm', { email: this.state.email });
    })
    .catch(err => {
      console.log('CONFIRM ERR: ', err);
      this.onFailure();
    });
  }

  resendCode() {
    const { email } = this.state;
    this.setState({ loadingResend: true });

    Auth.resendSignUp(email)
    .then(() => {
      console.log("Code Resent");
      this.onSuccess();
    })
    .catch(err => {
      console.log(err);
      this.onFailure();
    });
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

  renderResendButton() {
    if (this.state.loadingResend) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.resendCode.bind(this)}>
        Resend Code!
      </Button>
    );
  }


  render() {

    return(
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={imgSrc}
          />
        </View>


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

          <CardSection>
            { this.renderResendButton() }
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
    // backgroundColor: '#368ce7'
    backgroundColor: '#ffffff'
  },
};

export default CodeVerification;
