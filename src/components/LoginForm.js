import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { StackNavigator } from 'react-navigation';

import RegistrationForm from './RegistrationForm';
import ForgotPassword from './ForgotPassword';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');

type Props = {};

class LoginForm extends Component {
  state = { email: '',
            password: '',
            error: '',
            loading: false,
            userState: {}
          };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const email = params ? params.email: null;
    this.setState({ email: email? email: this.email });
  }

  login() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    Auth.signIn(email, password)
      .then((user) => {
        console.log(user);
        this.setState( { userState: user } )
        console.log(this.state);
        this.onLoginSuccess();
      })
      .catch(err => console.log(err));
}

  onLoginFail() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
    this.props.navigation.navigate('Welcome', { username: this.state.userState.username });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.login.bind(this)}>
        Log In!
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

        <Text onPress={() => this.props.navigation.navigate('RegistrationForm')}
              style={styles.linkTextStyle}>
          New User? Register Here!
        </Text>

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
            { this.renderButton() }
          </CardSection>

        </Card>

        <Text onPress={() => this.props.navigation.navigate('ForgotPassword', {email: this.state.email})}
              style={styles.linkTextStyle}>
          Forgot Password!
        </Text>

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
    fontSize: 20,
    alignSelf: 'center'
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

export default LoginForm;


// import React, { Component } from 'react';
// import { Text, View, Image, StyleSheet, TextInput, Button } from 'react-native';
// import Amplify, { Auth } from 'aws-amplify';
//
//
// import awsconfig from '../aws-exports';
// // import { Card, CardSection, Input, Button, Spinner } from './common';
//
// Amplify.configure(awsconfig);
// // const imgSrc = require('../images/travlendar_logo.png');
//
// type Props = {};
//
// class LoginForm extends Component {
//   state = {
//     username: 'adityanimbalkar3429@gmail.com',
//     password: 'Password@123'
//   }
//
//   signIn() {
//     // this.setState({
//     //   username: 'adityanimbalkar3429@gmail.com',
//     //   password: 'Password@123'
//     // });
//     const { username, password } = this.state;
//     console.log(username);
//     console.log(password);
//     Auth.signIn(username, password)
//       .then(user => console.log(user))
//       .catch(err => console.log(err));
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           TRAVLENDAR SIGNIN PAGE!
//         </Text>
//         <Button
//           title="Sign In"
//           onPress={this.signIn.bind(this)}
//         />
//       </View>
//     );
//   }
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
// export default LoginForm;
