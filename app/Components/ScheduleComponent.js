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
import uniqueId from 'lodash.uniqueid'

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
    const programs = {...this.props.bookings.programs};
    if(this.props.settings.separateSchedules){
      const bookings = programs[this.props.specificProgram]
      if(bookings) {
        for(booking of bookings){
          allBookings.push(booking)
        }
      }
    } else {
      for(name in programs) {
        for(booking of programs[name]){
          allBookings.push(booking)
        }
      }
    }

    allBookings.sort((a, b) => {
      if(a.start < b.start) return -1;
	    if(a.start > b.start) return 1;
      return 0;
    });

    let mappedBookings = [];
    let lastDate = moment([2000, 1, 1]);
    let lastUid = "";
    let lastweek = -1;
    for(booking of allBookings) {
      const date = moment(booking.start);
      const week = date.isoWeek();
      if(week !== lastweek) {
        mappedBookings.push(
          <Hr
            key={uniqueId("week")}
            marginLeft={50}
            marginRight={50}
            textStyle={{
              color: "#474056", fontSize: 20,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationColor: "#000"
           }}
            text={"VECKA " + week}
            lineColor="#474056"/>
          );
      }
      if(date.day() != lastDate.day()) {
        const dateString = date.format('dddd MMMM Do YYYY')
        mappedBookings.push(<Hr key={uniqueId(dateString)} text={dateString} lineColor="#000"/>);
      }
      if(booking.uid !== lastUid) {
        mappedBookings.push(<BookingComponent booking={booking} key={uniqueId(booking.uid)}/>);
        lastUid = booking.uid;
      }
      lastweek = week;
      lastDate = date;
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
