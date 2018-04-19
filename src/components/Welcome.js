import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { Card, CardSection, Input, Button, Spinner } from './common';

type Props = {};

class Welcome extends Component {
  render() {

    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;

    return(
      <View>
        <Text>
          {username}
        </Text>
      </View>
    );
  }
}

export default Welcome;
