import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { Card, CardSection, Input, Button, Spinner } from './common';

type Props = {};

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    // header: null,
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
            <Button>
              Log Out!
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default HomeScreen;
