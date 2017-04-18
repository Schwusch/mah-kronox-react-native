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
    let stuffToRender = [];
    if (!this.props.bookings.list.length && !this.props.bookings.loading && this.props.programs.length) {
        stuffToRender.push(
          <Icon.Button
            size={30}
            name="refresh"
            backgroundColor="#FFF"
            color="#000"
            key="loadStuff"
            disabled={!this.props.bookings.loading}
            onPress={fetchAllBookings} />
        );
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

    let mappedBookings = [];
    let lastDate = "";
    let lastUid = "";
    const bookings = this.props.bookings.list;
    for(booking of this.props.bookings.list) {
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

    stuffToRender = stuffToRender.concat(mappedBookings);
    return (
      <View style={styles.schedule}>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.props.bookings.loading}
              onRefresh={fetchAllBookings}
            />
          }>
          {stuffToRender}
        </ScrollView>
      </View>
    )
  }
}

AppRegistry.registerComponent('ScheduleComponent', () => ScheduleComponent);
