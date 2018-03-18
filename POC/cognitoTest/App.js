
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

  let authenticationData = {
        Username : 'CognitoTest1',
        Password : 'Password@123',
    };
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  let poolData = {
        UserPoolId : 'us-west-2_xB02p2TFa', // Your user pool id here
        ClientId : '4lpvb766fg6qolk6rnj69qbhf' // Your client id here
    };
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  let userData = {
      Username : 'CognitoTest1',
      Pool : userPool
  };
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          console.log('access token + ' + result.getAccessToken().getJwtToken());

          //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = '<region>';

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              // IdentityPoolId : '...', // your identity pool id here
              Logins : {
                  // Change the key below according to the specific region your user pool is in.
                  'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
              }
          });

          //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          AWS.config.credentials.refresh((error) => {
              if (error) {
                    console.error(error);
              } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    console.log('Successfully logged!');
              }
          });
      },

      onFailure: function(err) {
          alert(err);
      },

  });

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
