import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
const imgSrc = require('../images/travlendar_logo.png');

type Props = {};

class ForgotPassword extends Component {

  state = { code: '',
            error: ''
          };
  render() {
    return(
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
              placeholder='user@domain.com'
              label='Email'
              value={this.state.code}
              onChangeText={code => this.setState({ code })}
              />
            </CardSection>
        </Card>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='Enter New Password'
            label='Password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Input
            secureTextEntry
            placeholder='Re-enter New Password'
            label='Confirm'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <CardSection>
          <Button onPress={}>
            Save
          </Button>
        </CardSection>

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
    backgroundColor: '#368ce7'
  },
};

export default ForgotPassword;
