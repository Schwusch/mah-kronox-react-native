import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import App from '../App'
import AddProgramComponent from '../AddProgramComponent'

import store from '../../store/store';

const RouterWithRedux = connect()(Router);

export default class StartComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
            <Scene key="root" >
              <Scene key="app" component={App} title="Schedule" initial />
              <Scene key="addProgram" component={AddProgramComponent} title="Add Program" />
            </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('StartComponent', () => StartComponent);
