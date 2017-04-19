import 'rxjs';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import App from '../App'
import AddProgramComponent from '../AddProgramComponent'

import store from '../../store/store';

export default class StartComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('StartComponent', () => StartComponent);
