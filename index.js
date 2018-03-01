import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/components/Login/Login';

const NavigationApp = StackNavigator({
  Login: { screen: Login },
});

export default class TravlendarApp extends Component {
  render() {
    return (
      <NavigationApp />
    );
  }
}

AppRegistry.registerComponent('Travlendar', () => TravlendarApp);
