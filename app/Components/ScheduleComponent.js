import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
  FlatList
} from 'react-native';
import { fetchAllBookings } from '../actions/fetchBookings';
import BookingComponent from './BookingComponent';
import ListDateComponent from './ListDateComponent';
import * as actionTypes from '../constants/actionTypes';
import moment from 'moment';
const svLocale = require('moment/locale/sv');
import Icon from 'react-native-vector-icons/FontAwesome';
import uniqueId from 'lodash.uniqueid';
import { Content } from 'native-base';

moment.updateLocale('sv', svLocale);

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
    backgroundColor: '#4F3381',
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

  buildDataStructure() {
    let allBookings = []
    const programs = this.props.bookings.programs;
    if(this.props.settings.separateSchedules && programs[this.props.specificProgram]){
      allBookings = programs[this.props.specificProgram]
    } else {
      for(name in programs) {
        allBookings = allBookings.concat(programs[name])
      }
    }

    let weeks = [];

    if(allBookings.length > 0) {
      allBookings.sort((a, b) => {
        if(a.start < b.start) return -1;
  	    if(a.start > b.start) return 1;
        return 0;
      });

      let lastBooking = allBookings[0];
      let lastBookingDate = moment(lastBooking.start);

      let dayObject = {
        date: lastBookingDate.format('Do MMMM YYYY'),
        weekday: lastBookingDate.format('dddd'),
        bookings: [lastBooking]
      };

      let weekObject = {
        key: uniqueId(lastBookingDate.format()),
        number: lastBookingDate.isoWeek(),
        days: [dayObject]
      };

      weeks.push(weekObject);

      for(booking of allBookings) {
        bookingDate = moment(booking.start)

        if (lastBookingDate.isoWeek() !== bookingDate.isoWeek()) {
          dayObject = {
            date: bookingDate.format('Do MMMM YYYY'),
            weekday: bookingDate.format('dddd'),
            bookings: [booking]
          }
          weekObject = {
            key: uniqueId(bookingDate.format()),
            number: bookingDate.isoWeek(),
            days: [dayObject]
          }

          weeks.push(weekObject)
        } else if (lastBookingDate.dayOfYear() != bookingDate.dayOfYear()) {
          dayObject = {
            date: bookingDate.format('Do MMMM YYYY'),
            weekday: bookingDate.format('dddd'),
            bookings: [booking]
          }
          weekObject.days.push(dayObject);
        } else if (booking.uid !== lastBooking.uid) {
          dayObject.bookings.push(booking);
        }

        lastBooking = booking;
        lastBookingDate = bookingDate;
      }
    }

    return weeks
  }

  renderBooking(booking) {
    return <BookingComponent dispatch={this.props.dispatch} signatures={this.props.bookings.signatures} booking={booking} key={uniqueId(booking.uid)}/>
  }

  renderDay(day) {
    return (
      <View key={uniqueId(day.date)}>
        <ListDateComponent key={uniqueId(day.date)} date={day.date} weekday={day.weekday} />
        {day.bookings.map(this.renderBooking.bind(this))}
      </View>
    )
  }

  renderWeek(week) {
    week = week.item
    return (
      <View style={styles.week}>
        <View style={styles.weekHeader}>
          <Text style={[styles.text, {fontSize: 30,}]}>{"v." + week.number}</Text>
        </View>
          {week.days.map(this.renderDay.bind(this))}
      </View>
    )
  }

  render() {
    return (
        <Content>
          <FlatList
            data={this.buildDataStructure()}
            renderItem={this.renderWeek.bind(this)}
          />
        </Content>
    )
  }
}
