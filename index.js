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
          var AWS = require('aws-sdk');
          AWS.config.update({
            credentials: {
              accessKeyId: '',
              secretAccessKey: ''
            },
            region: 'us-west-2'
          });
          var sns = new AWS.SNS();
          var device_token = token.token;
          console.log(device_token)


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
                  console.log("Successfully added device: "+data);
                }
          });

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
