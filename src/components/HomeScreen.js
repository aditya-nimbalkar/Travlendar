import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Amplify, { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { Card, CardSection, Input, Button, Spinner } from './common';

Amplify.configure(awsconfig);
type Props = {};

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    // header: null,
  }

  logout() {
    console.log("Logout button clicked");
    Auth.signOut()
      .then(data => {
        console.log("Here:" + data);
        console.log('Logged Out');
        this.props.navigation.navigate('LoginForm');
      })
      .catch(err => console.log('ERR: ', err));
  }

  render() {

    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;

    return(
      <View>
        <Text>
          Hello {username}
        </Text>

        <Card>
          <CardSection>
            <Button>
              Change Password!
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.logout.bind(this)}>
              Log Out!
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default HomeScreen;
