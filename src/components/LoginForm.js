import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });


}

  onLoginFail() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In!
      </Button>
    );
  }

  render() {
    return (
      // <View>
      //   <Text>
      //     WELOCOME TUOA REACT ANTIVE HELLBVBCMNADBNCBSAMBCNSM
      //   </Text>
      // </View>
      <Card>
        <CardSection>
          <Input
            placeholder='user@domain.com'
            label='Email'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='password'
            label='Password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <CardSection>
          { this.renderButton() }
        </CardSection>

      </Card>
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
