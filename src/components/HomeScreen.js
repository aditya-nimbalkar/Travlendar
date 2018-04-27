import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';

import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';
import PushNotification from 'react-native-push-notification';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');
type Props = {};

class HomeScreen extends Component {

  state = {
    endpoint: '',
    user: '',
    loadingLogout: false
  };

  static navigationOptions = {
    title: 'Home',
    // header: null,
  }


  componentWillMount() {
    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
    const endpoint = params ? params.endpoint : null;
    const userState = params ? params.userState : null;
    console.log(userState);
    this.setState({ user: userState });
  }

  logout() {

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          var AWS = require('aws-sdk');
          AWS.config.update({
            region: 'us-west-2'
          });
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:8763dc1c-39ea-4734-9021-b9037792d1b3',
          }, {
            region: 'us-west-2'
          });
          var sns = new AWS.SNS();
          var device_token = token.token;

          sns.createPlatformEndpoint({
            PlatformApplicationArn:  'arn:aws:sns:us-west-2:016911789346:app/GCM/Travlendar',
            Token: device_token,
            CustomUserData: "User Removed"
          }, function(err, data) {
                var endpoint_arn = '';
                if (err) {
                  var error_object = JSON.stringify(err);
                  if(err.code == "InvalidParameter") {
                    endpoint_arn = err.message.split(" ")[5];
                  }
                  sns.deleteEndpoint({
                      EndpointArn: endpoint_arn,
                  }, function(err, data) {
                        if (err) {
                          console.log(err.stack);
                          return;
                        }
                        else {
                          console.log("Successfully deleted device: " + endpoint_arn);
                        }
                  });
                }
                else {
                  console.log("New endpoint created. Please check backend!")
                }
          });
        },

    });

    Auth.signOut()
      .then(data => {
        console.log('User Logged Out');
        this.props.navigation.navigate('LoginForm');
      })
      .catch(err => console.log('ERR: ', err));
  }

  changePassword() {
    this.props.navigation.navigate('ChangePassword', { user: this.state.user });
  }

  render() {

    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
    const URL = 'https://www.travlendar.com';

    return(
      <View style={styles.container}>
        <Text style={ styles.welcomeTextStyle }>
          Hello {this.state.user.username}
        </Text>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={imgSrc}
          />
        </View>
        <Text style={ { padding: 15, textAlign: 'center' } }>
          You will now receive push notifications for your upcoming events on this device.
        </Text>
        <Text style={ { padding: 15, textAlign: 'center' } }>
          If you want to stop receiving notifications please click Logout.
        </Text>

        <TouchableOpacity onPress={ ()=>{ Linking.openURL(URL)}}>
            <Text style={styles.linkTextStyle}>
              To schedule an event, visit our website.
            </Text>
        </TouchableOpacity>

        <Card>
          <CardSection>
            <Button onPress={this.changePassword.bind(this)}>
              Change Password!
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.logout.bind(this)}>
              Log Out!
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
  welcomeTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 15,
    fontWeight: 'bold'
  },
  linkTextStyle: {
    fontSize: 20,
    padding: 15,
    textAlign: 'center',
    color: 'deepskyblue',
    textDecorationLine: 'underline'
  },
  logo: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // backgroundColor: '#AED6F1',
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
    // backgroundColor: '#AED6F1'
    backgroundColor: '#ffffff'
  },
};

export default HomeScreen;
