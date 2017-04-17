import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import ProgramComponent from './ProgramComponent';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScheduleComponent from './ScheduleComponent';

var styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    marginTop: 64
  },
  text: {
    color: '#841584',
    fontWeight: 'bold',
  }
})

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs
  }
})
export default class App extends Component {
  onFetch () {
    fetchBookings(this.props.programs[0])
  }

  render() {
    const programs = this.props.programs.map(program => <ProgramComponent dispatch={this.props.dispatch} program={program} key={program}/>);

    return (
      <Swiper showsButtons={true} loop={false}>
        <ScheduleComponent
          bookings={this.props.bookings}
          programs={this.props.programs}
        />
        <View style={styles.settings}>
          <Text style={styles.text}>Inställningar</Text>
          {programs}
          <Icon.Button
            name="plus-circle"
            onPress={Actions.addProgram}
            backgroundColor="#841584"
            key="addProgram"
          >
            Lägg till program eller kurs
          </Icon.Button>
        </View>
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
