import 'rxjs';
import React, { Component } from 'react';
import { AppRegistry, AppState } from 'react-native';
import { connect, Provider } from 'react-redux';
import { fetchAllBookings } from '../../actions/fetchBookings'
import { Router, Scene } from 'react-native-router-flux';
import store from '../../store/store';
import SettingsComponent from '../SettingsComponent'
import AddProgramComponent from '../AddProgramComponent'
import AllSchedules from '../AllSchedules'
import { Toast } from 'native-base'

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
        <RouterWithRedux>
            <Scene key="root" hideNavBar= "true">
              <Scene key="AllSchedules" component={AllSchedules} initial={true}/>
              <Scene key="Settings" component={SettingsComponent}/>
              <Scene key="AddPrograms" component={AddProgramComponent}/>
            </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('StartComponent', () => StartComponent);
