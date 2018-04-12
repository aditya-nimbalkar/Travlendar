import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginForm from './src/components/LoginForm';
import RegistrationForm from './src/components/RegistrationForm';

const NavigationApp = StackNavigator({
  RegistrationForm: { screen: RegistrationForm }
  // LoginForm: { screen: LoginForm }
});

class App extends Component {
    render() {
      return (
        <NavigationApp />
      );
    }
}

export default App;
