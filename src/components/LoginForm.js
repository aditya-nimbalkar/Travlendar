import React, { Component } from 'react';
import { Text } from 'react-native';

import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  // state = { email: '', password: '', error: '', loading: false };

  render() {
    return (

      <Text>
        WELOCOME TUOA REACT ANTIVE HELLBVBCMNADBNCBSAMBCNSM
      </Text>
      // <Card>
      //   <CardSection>
      //     <Input
      //       placeholder='user@domain.com'
      //       label='Email'
      //       value={this.state.email}
      //       onChangeText={email => this.setState({ email })}
      //     />
      //   </CardSection>
      //
      //   <CardSection>
      //     <Input
      //       secureTextEntry
      //       placeholder='password'
      //       label='Password'
      //       value={this.state.password}
      //       onChangeText={password => this.setState({ password })}
      //     />
      //   </CardSection>
      //
      //   <Text style={styles.errorTextStyle}>
      //     { this.state.error }
      //   </Text>
      //
      //   <CardSection>
      //     { this.renderButton() }
      //   </CardSection>
      //
      // </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
