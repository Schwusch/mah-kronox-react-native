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
import { Actions } from 'react-native-router-flux';

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings
  }
})
export default class App extends Component {
  _onTouchEnd (e, state) {
    Actions.refresh({title: this.state.keys[state.index]})
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
        key="Inställningar"
        loading={this.props.bookings.loading}
        programs={this.props.programs}
        dispatch={this.props.dispatch}
        settings={this.props.settings}
      />
    )
    let keys = [];
    for(comp of swipes) {
      keys.push(comp.key)
    }
    this.state = {...this.state, keys: keys};
    return (
      <Swiper
        showsButtons={true}
        loop={false}
        onMomentumScrollEnd={this._onTouchEnd.bind(this)}>
        {swipes}
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
