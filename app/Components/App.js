import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import ScheduleComponent from './ScheduleComponent';
import SettingsComponent from './SettingsComponent';

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs
  }
})
export default class App extends Component {
  render() {
    return (
      <Swiper showsButtons={true} loop={false}>
        <ScheduleComponent
          bookings={this.props.bookings}
          programs={this.props.programs}
        />
        <SettingsComponent
          programs={this.props.programs}
          dispatch={this.props.dispatch}
        />
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
