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
import ListDateComponent from './ListDateComponent';
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';
import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/FontAwesome';
import uniqueId from 'lodash.uniqueid';

var styles = StyleSheet.create({
  schedule: {
    flex: 1,
    backgroundColor: '#EFF4FF',
  },
  week: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: '#C9CDD6',
  },
  text: {
    color: "#ffffff"
  },
  weekHeader: {
    backgroundColor: '#522B47',
    padding: 5
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
    let weeks = [];
    let lastDate = moment([2000, 1, 1]);
    let lastUid = "";
    let lastweek = -1;
    for(booking of allBookings) {
      const date = moment(booking.start);
      const week = date.isoWeek();
      if(week !== lastweek && lastweek != -1) {
        weeks.push(
          <View style={styles.week} key={uniqueId()}>
            <View style={styles.weekHeader}>
              <Text style={[styles.text, {fontSize: 30,}]}>{"v." + week}</Text>
            </View>
            {mappedBookings}
          </View>
        );
        mappedBookings = [];
      }
      if(date.dayOfYear() != lastDate.dayOfYear()) {
        const dateString = date.format('MMMM Do YYYY');
        const weekdayString = date.format('dddd');
        mappedBookings.push(<ListDateComponent key={uniqueId(dateString)} date={dateString} weekday={weekdayString} />);
      }
      if(booking.uid !== lastUid) {
        mappedBookings.push(<BookingComponent booking={booking} key={uniqueId(booking.uid)}/>);
        lastUid = booking.uid;
      }

      lastweek = week;
      lastDate = date;
    }
    return weeks
  }

  render() {
    return (
        <ScrollView
          style={styles.schedule}
          refreshControl={
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
