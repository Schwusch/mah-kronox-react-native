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
import { Content } from 'native-base';

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
  componentDidMount() {
    const programs = this.props.bookings.programs;
    if(programs[this.props.specificProgram] === undefined) {
      fetchAllBookings();
    }
  }

  listComponentsToRender() {
    let allBookings = []
    const programs = this.props.bookings.programs;
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
    let lastweek;
    if(allBookings.length > 0) {
      lastweek = moment(allBookings[0].start).isoWeek();
    }
    for(booking of allBookings) {
      const date = moment(booking.start);
      const week = date.isoWeek();
      if(week !== lastweek) {
        weeks.push(
          <View style={styles.week} key={uniqueId()}>
            <View style={styles.weekHeader}>
              <Text style={[styles.text, {fontSize: 30,}]}>{"v." + lastweek}</Text>
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
        mappedBookings.push(<BookingComponent dispatch={this.props.dispatch} signatures={this.props.bookings.signatures} booking={booking} key={uniqueId(booking.uid)}/>);
        lastUid = booking.uid;
      }

      lastweek = week;
      lastDate = date;
    }

    if(mappedBookings.length > 0) {
      weeks.push(
        <View style={styles.week} key={uniqueId()}>
          <View style={styles.weekHeader}>
            <Text style={[styles.text, {fontSize: 30,}]}>{"v." + lastweek}</Text>
          </View>
          {mappedBookings}
        </View>
      );
    }
    
    return weeks
  }

  render() {
    return (
        <Content>
          {this.listComponentsToRender()}
        </Content>
    )
  }
}

AppRegistry.registerComponent('ScheduleComponent', () => ScheduleComponent);
