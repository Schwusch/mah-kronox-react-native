import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import BookingComponent from './BookingComponent';
import ProgramComponent from './ProgramComponent';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actionTypes from '../constants/actionTypes';

var styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    marginTop: 64
  },
  schedule: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  fetchBookings () {
    const baseUrl = "https://kronox.mah.se/setup/jsp/SchemaICAL.ics";
    const parameters = `?startDatum=idag&intervallTyp=m&intervallAntal=6&sokMedAND=false&sprak=SV&resurser=p.${this.props.programs[0]}`
    this.props.dispatch((dispatch) => {
      fetch(`${baseUrl}${parameters}`)
      .then((response) => {
         dispatch({
           type: actionTypes.BOOKINGS_BODY,
           payload: response.text()
         })
      })
      .catch((err) => {
        dispatch({type: actionTypes.FETCH_BOOKINGS_ERROR, payload: err});
      })
    });
  }

  render() {
    let stuffToRender = [];
    if (!this.props.bookings.list.length && !this.props.bookings.loading && this.props.programs.length) {
        stuffToRender.push(
          <Button
            onPress={this.fetchBookings.bind(this)}
            title="HÄMTA SCHEMA"
            color="#841584"
            key="loadStuff"
          />);
    }
    if (!this.props.programs.length) {
      stuffToRender.push(
        <Text
          key="infoTextWhenNoPrograms"
          style={styles.text}>
          Lägg till schema genom att dra åt sidan!
        </Text>
      )
    }
    let mappedBookings = this.props.bookings.list.map(booking => <BookingComponent booking={booking} key={booking.uid}/>);
    stuffToRender = stuffToRender.concat(mappedBookings);
    const programs = this.props.programs.map(program => <ProgramComponent dispatch={this.props.dispatch} program={program} key={program}/>);

    return (
      <Swiper showsButtons={true} loop={false}>
        <View style={styles.schedule}>
          <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.props.bookings.loading}
                onRefresh={this.fetchBookings.bind(this)}
              />
            }>
            {stuffToRender}
          </ScrollView>
        </View>
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
