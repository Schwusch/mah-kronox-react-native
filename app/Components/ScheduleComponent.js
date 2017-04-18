import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button
} from 'react-native';
import { fetchAllBookings } from '../actions/fetchBookings';
import BookingComponent from './BookingComponent';
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';
import Hr from 'react-native-hr'
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = StyleSheet.create({
  schedule: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64
  }
})

export default class ScheduleComponent extends Component {
  render() {
    let allBookings = []
    const programs = this.props.bookings.programs;
    if(this.props.settings.separateSchedules){
      for(booking of programs[this.props.specificProgram]){
        allBookings.push(booking)
      }
    } else {
      for(name in programs) {
        for(booking of programs[name]){
          allBookings.push(booking)
        }
      }
    }

    allBookings.sort((a, b) => {
      return a.start - b.start;
    });

    let mappedBookings = [];
    let lastDate = "";
    let lastUid = "";
    for(booking of allBookings) {
      let date = moment(booking.start).format('MMMM Do YYYY');
      if(date !== lastDate) {
        mappedBookings.push(<Hr key={date} text={date} lineColor="#000"/>);
        lastDate = date;
      }
      if(booking.uid !== lastUid) {
        mappedBookings.push(<BookingComponent booking={booking} key={booking.uid}/>);
        lastUid = booking.uid;
      }
    }
    return (
      <View style={styles.schedule}>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.props.bookings.loading}
              onRefresh={fetchAllBookings}
            />
          }>
          {mappedBookings}
        </ScrollView>
      </View>
    )
  }
}

AppRegistry.registerComponent('ScheduleComponent', () => ScheduleComponent);
