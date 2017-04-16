import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

import StartComponent from './app/Components/StartComponent/StartComponent';

export default class AwesomeProject extends Component {
  render() {
    return (
      <View>
        <StartComponent />
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
