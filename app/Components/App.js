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
  render() {
    let swipes = [];
    const programBookings = this.props.bookings.programs;
    if(this.props.settings.separateSchedules){
      for(program in programBookings) {
        console.log("program:", program);
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
          key="onlySchedule"
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
      <Swiper showsButtons={true} loop={false}>
        {swipes}
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
