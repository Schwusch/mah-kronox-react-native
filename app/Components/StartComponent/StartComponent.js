import 'rxjs';
import React, { Component } from 'react';
import { AppRegistry, AppState } from 'react-native';
import { connect, Provider } from 'react-redux';
import App from '../App'
import AddProgramComponent from '../AddProgramComponent'
import { fetchAllBookings } from '../../actions/fetchBookings'

import store from '../../store/store';

export default class StartComponent extends Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      fetchAllBookings();
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('StartComponent', () => StartComponent);
