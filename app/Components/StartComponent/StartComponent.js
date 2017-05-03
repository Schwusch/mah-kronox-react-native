import 'rxjs';
import React, { Component } from 'react';
import { AppState } from 'react-native';
import { connect, Provider } from 'react-redux';
import { fetchAllBookings } from '../../actions/fetchBookings'
import { Router, Scene, Actions } from 'react-native-router-flux';
import store from '../../store/store';
import SettingsComponent from '../SettingsComponent'
import AddProgramComponent from '../AddProgramComponent'
import AllSchedules from '../AllSchedules'
import codePush from "react-native-code-push";
import { Client } from 'bugsnag-react-native';

const bugsnag = new Client();

const connectedAllSchedules = connect()(AllSchedules);
const connectedSettingsComponent = connect()(SettingsComponent);
const connectedAddProgramComponent = connect()(AddProgramComponent);

const scenes = Actions.create(
  <Scene key="root" hideNavBar= "true">
    <Scene key="AllSchedules" component={connectedAllSchedules} initial={true}/>
    <Scene key="Settings" component={connectedSettingsComponent}/>
    <Scene key="AddPrograms" component={connectedAddProgramComponent}/>
  </Scene>
);

const RouterWithRedux = connect()(Router);

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
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}
