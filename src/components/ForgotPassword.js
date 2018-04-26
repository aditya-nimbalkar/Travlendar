import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');

type Props = {};

class ForgotPassword extends Component {

  state = { email: '',
            password: '',
            code: '',
            error: ''
          };

  static navigationOptions = {
    // title: 'Forgot Password',
    header: null,
  }


  componentWillMount() {
    const { params } = this.props.navigation.state;
    const email = params ? params.email: null;
    this.setState({ email: email? email: this.email });
  }

  requestCode() {

      const { email } = this.state;

      this.setState({ error: '' });

      Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => console.log(err));
  }

  submitPassword() {
    const { email, code, password } = this.state;

    this.setState({ error: '' });

    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(email, code, password)
      .then(data => {
        console.log(data);
        console.log('Password Changed!')
        this.props.navigation.navigate('LoginForm', { email: this.state.email });
      })
      .catch(err => console.log(err));
  }

  render() {

    // const { params } = this.props.navigation.state;
    // const email = params ? params.email: null;
    // this.setState({ email: this.emailProp });
    // console.log(emailProp);

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
              // autoFocus
              autoCapitalize='none'
              placeholder='user@domain.com'
              label='Email'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              />
          </CardSection>
          <CardSection>
            <Button onPress={this.requestCode.bind(this)}>
              Request!
            </Button>
          </CardSection>
        </Card>

        <Card>

          <CardSection>
            <Input
              secureTextEntry
              placeholder='Enter Code'
              label='Code'
              value={this.state.code}
              onChangeText={code => this.setState({ code })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              placeholder='Enter New Password'
              label='Password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.submitPassword.bind(this)}>
              Submit!
            </Button>
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

export default ForgotPassword;
