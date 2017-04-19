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
    programs: store.programs,
    settings: store.settings
  }
})
export default class App extends Component {
  _onTouchEnd (e, state) {
    console.log(e, state)
  }

  render() {
    let swipes = [];
    const programBookings = this.props.bookings.programs;
    if(this.props.settings.separateSchedules){
      for(program in programBookings) {
        swipes.push(
          <ScheduleComponent
            key={program}
            specificProgram={program}
            bookings={this.props.bookings}
            programs={this.props.programs}
            dispatch={this.props.dispatch}
            settings={this.props.settings}
          />
        )
      }
    } else {
      swipes.push(
        <ScheduleComponent
          key="Alla"
          bookings={this.props.bookings}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
      )
    }

    swipes.push(
      <SettingsComponent
        key="settings"
        loading={this.props.bookings.loading}
        programs={this.props.programs}
        dispatch={this.props.dispatch}
        settings={this.props.settings}
      />
    )
    return (
      <Swiper
        showsButtons={true}
        loop={false}
        onTouchEnd={this._onTouchEnd.bind(this)}>
        {swipes}
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
