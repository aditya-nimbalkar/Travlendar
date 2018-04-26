import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';
import PushNotification from 'react-native-push-notification';

Amplify.configure(awsconfig);
type Props = {};

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    // header: null,
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

  render() {

    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;

    return(
      <View>
        <Text>
          Hello {username}
        </Text>

        <Card>
          <CardSection>
            <Button>
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

export default HomeScreen;
