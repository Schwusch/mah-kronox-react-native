import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import StartComponent from './app/Components/StartComponent/StartComponent';

export default class AwesomeProject extends Component {
  render() {
    return <StartComponent />;
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
