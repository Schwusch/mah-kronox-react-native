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
    alignItems: 'center'
  }
})

export default class ScheduleComponent extends Component {
  listComponentsToRender() {
    let allBookings = []
    const programs = this.props.bookings.programs;
    if(this.props.settings.separateSchedules){
      const bookings = programs[this.props.specificProgram]
      for(booking of bookings){
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
    let lastDate = moment([2000, 1, 1]);
    let lastUid = "";
    for(booking of allBookings) {
      let date = moment(booking.start);
      if(date.diff(lastDate, 'days') != 0) {
        const dateString = date.format('MMMM Do YYYY')
        mappedBookings.push(<Hr key={dateString} text={dateString} lineColor="#000"/>);
        lastDate = date;
      }
      if(booking.uid !== lastUid) {
        mappedBookings.push(<BookingComponent booking={booking} key={booking.uid}/>);
        lastUid = booking.uid;
      }
    }
    return mappedBookings
  }

  render() {
    return (
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.props.bookings.loading}
              onRefresh={fetchAllBookings}
            />
          }>
          {this.listComponentsToRender()}
        </ScrollView>
    )
  }
}

AppRegistry.registerComponent('ScheduleComponent', () => ScheduleComponent);
