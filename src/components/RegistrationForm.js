import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
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

  onFailure() {
    // console.log('Inside Failure function!');
    this.setState({ error: 'Registration Failed.',
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
    })
    .catch(err => {
      console.log('ERR: ', err);
      this.onFailure();
    });
    // .then(this.onSignUpSuccess.bind(this))
    // .catch(this.onSignUpFail.bind(this));
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
    return (

      <View style={styles.container}>

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

            <CardSection>
              { this.renderResendButton() }
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



// import React, { Component } from 'react';
// import { Text, View, Image, StyleSheet, TextInput, Button } from 'react-native';
// import Amplify, { Auth } from 'aws-amplify';
//
//
// import awsconfig from '../aws-exports';
// // import { Card, CardSection, Input, Button, Spinner } from './common';
//
// Amplify.configure(awsconfig);
//
// type Props = {};
//
// class RegistrationForm extends Component {
//   state = {
//     authCode: ''
//   }
//
//   onChangeText(value) {
//     this.setState({
//       authCode: value
//     });
//   }
//
//   signUp() {
//     Auth.signUp({
//       username: 'adityanimbalkar3429@gmail.com',
//       password: 'Password@123',
//       attributes: {
//         email: 'adityanimbalkar3429@gmail.com'
//         // phone: ''
//       }
//     })
//     .then(res => {
//       console.log('SIGNED UP!', res)
//     })
//     .catch(err => {
//       console.log('ERR: ', err)
//     })
//   }
//
//   verify() {
//     console.log(this.state.authCode)
//     Auth.confirmSignUp('adityanimbalkar3429@gmail.com', this.state.authCode)
//     .then(res => {
//       console.log('CONFIRM SIGNED UP!', res)
//     })
//     .catch(err => {
//       console.log('CONFIRM ERR: ', err)
//     })
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           TRAVLENDAR SIGNUP PAGE!
//         </Text>
//         <Button
//           title="Sign Up"
//           onPress={this.signUp.bind(this)}
//         />
//         <TextInput
//         style={styles.input}
//         onChangeText={value => this.onChangeText(value)}
//         placeholder='code'
//         />
//         <Button
//           title="Confirm Code"
//           onPress={this.verify.bind(this)}
//         />
//       </View>
//     );
//   }
//
// }
//
// const styles = StyleSheet.create({
//   input: {
//     height: 50,
//     backgroundColor: '#ededed'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// export default RegistrationForm;
