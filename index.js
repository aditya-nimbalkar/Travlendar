import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './src/components/Login/Login';
import PushNotification from 'react-native-push-notification';

const NavigationApp = StackNavigator({
  Login: { screen: Login },
});

export default class TravlendarApp extends Component {
  render() {
    return (
      <NavigationApp />
    );
  }

  componentDidMount() {
      console.log('Did mount')
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          console.log('TOKEN:', token);
          var device_token = token.token;
          console.log(device_token);

          var AWS = require('aws-sdk');
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-west-2:8763dc1c-39ea-4734-9021-b9037792d1b3',
          }, {
            region: 'us-west-2'
          });
          // AWS.config.update({
          //   credentials: { // Add lines to connect to the AWS SNS service
          //     accessKeyId: '',
          //     secretAccessKey: ''
          //   },
          //   region: 'us-west-2'
          // });
          var sns = new AWS.SNS();
          console.log(sns)
          var endpoint_arn = "";
/*
          sns.createPlatformEndpoint({
            PlatformApplicationArn:  'arn:aws:sns:us-west-2:016911789346:app/GCM/Travlendar',
            Token: device_token,
            CustomUserData: "Alfred"
          }, function(err, data) {
                if (err) {
                  // callback(null, JSON.stringify(err));
                  console.log(err.stack);
                  return;
                }
                else {
                  console.log("Successfully added device: ARN = " + data);
                  endpoint_arn = data;
                }
          });

          sns.deleteEndpoint({
              EndpointArn: endpoint_arn,
          }, function(err, data) {
                if (err) {
                  // callback(null, JSON.stringify(err));
                  console.log(err.stack);
                  return;
                }
                else {
                  console.log("Successfully deleted device: " + data);
                }
          });
*/
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
          console.log('NOTIFICATION:', notification);
        },
        // ANDROID ONLY: GCM Sender ID (optional — not required for local notifications, but is need to receive remote push notifications)
        senderID: "383990736767",
        // IOS ONLY (optional): default: all — Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
        /**
        * (optional) default: true
        * — Specified if permissions (ios) and token (android and ios) will requested or not,
        * — if not, you must call PushNotificationsHandler.requestPermissions() later
        */
        requestPermissions: true,
      });
    }
}

AppRegistry.registerComponent('Travlendar', () => TravlendarApp);
