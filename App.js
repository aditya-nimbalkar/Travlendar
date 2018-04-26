import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginForm from './src/components/LoginForm';
import RegistrationForm from './src/components/RegistrationForm';
import ForgotPassword from './src/components/ForgotPassword';
import CodeVerification from './src/components/CodeVerification';
import HomeScreen from './src/components/HomeScreen';
import ChangePassword from './src/components/ChangePassword';

const NavigationApp = StackNavigator(
  {
    RegistrationForm: { screen: RegistrationForm },
    LoginForm: { screen: LoginForm },
    ForgotPassword: { screen: ForgotPassword },
    CodeVerification: { screen: CodeVerification },
    HomeScreen: { screen: HomeScreen },
    ChangePassword: { screen: ChangePassword },
  },
  {
    initialRouteName: 'LoginForm',
  }
);

class App extends Component {
    render() {
      return (
        <NavigationApp/>
      );
    }
}

export default App;
