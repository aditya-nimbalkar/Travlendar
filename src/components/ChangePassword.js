import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');

type Props = {};

class ChangePassword extends Component {
  state = {
    // user: {},
    oldPassword: '',
    newPassword: '',
    loadingChangePassword: false,
    error: ''
  };

  static navigationOptions = {
    title: 'Change Password',
    // header: null,
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const user = params ? params.user: null;
    this.setState({ user });
    // console.log(user);
  }

  changePassword() {
    const { oldPassword, newPassword } = this.state;
    this.setState({ loadingChangePassword: true, error: '' });
    // console.log(this.state.user);
    // Auth.changePassword(this.state.user, oldPassword, newPassword)
    // .then(data => {
    //   console.log('Password Change Success');
    //   console.log(data);
    //   this.setState({ loadingChangePassword: false });
    //   this.props.navigation.navigate('HomeScreen', { userState: this.state.user });
    // })
    // .catch(err => {
    //   console.log('Password Change Error');
    //   console.log(err);
    //   // if (typeof err !== null && typeof err === 'object') {
    //   //     // this.setState({ error: 'Registration Failed.' });
    //   //     this.setState({ error: err.message });
    //   // } else {
    //   //     this.setState({ error: err });
    //   // }
    //   this.setState({ loadingChangePassword: false });
    // });

    Auth.currentAuthenticatedUser()
    .then(user => {
        console.log(user);
        return Auth.changePassword(user, oldPassword, newPassword);
    })
      .then(data => {
        console.log('Password Change Success');
        console.log(data);
        this.setState({ loadingChangePassword: false });
        this.props.navigation.navigate('HomeScreen', { userState: this.state.user });
      })
      .catch(err => {
        console.log('Password Change Error');
        console.log(err);
        if (typeof err !== null && typeof err === 'object') {
            // this.setState({ error: 'Registration Failed.' });
            this.setState({ error: err.message });
        } else {
            this.setState({ error: err });
        }
        this.setState({ loadingChangePassword: false });
      });
  }

  renderButton() {
    if (this.state.loadingChangePassword) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.changePassword.bind(this)}>
        Submit!
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

      <Card>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='Enter Old Password'
            label='Old Password'
            value={this.state.oldPassword}
            onChangeText={oldPassword => this.setState({ oldPassword })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='Enter New Password'
            label='New Password'
            value={this.state.newPassword}
            onChangeText={newPassword => this.setState({ newPassword })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <CardSection>
          { this.renderButton() }
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
    // backgroundColor: '#368ce7'
    backgroundColor: '#ffffff'
  },
};

export default ChangePassword;
