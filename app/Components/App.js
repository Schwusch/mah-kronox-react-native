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
import AddProgramComponent from './AddProgramComponent'
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings,
    autocomplete: store.autocomplete
  }
})
export default class App extends Component {
  render() {
    let swipes = [];
    const programBookings = this.props.bookings.programs;
    if(this.props.settings.separateSchedules){
      for(program in programBookings) {
        swipes.push(
          <ScheduleComponent
            key={program}
            tabLabel={program}
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
          tabLabel="Alla"
          bookings={this.props.bookings}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
      )
    }

    return (
      <ScrollableTabView>
        {swipes}
        <SettingsComponent
          key="Inställningar"
          tabLabel="Inställningar"
          loading={this.props.bookings.loading}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
        <AddProgramComponent
        key="Lägg till schema"
        tabLabel="Lägg till schema"
        loading={this.props.bookings.loading}
        programs={this.props.programs}
        dispatch={this.props.dispatch}
        settings={this.props.settings}
        autocomplete={this.props.autocomplete}
      />
      </ScrollableTabView>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
