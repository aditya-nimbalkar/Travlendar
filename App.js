import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginForm from './src/components/LoginForm';

const NavigationApp = StackNavigator({
  LoginForm: { screen: LoginForm },
});

class App extends Component {
    render() {
      return (
        <NavigationApp />
      );
    }
}

export default App;
