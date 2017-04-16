import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import BookingComponent from './BookingComponent';

@connect((store) => {
  return {
    bookings: store.bookings
  }
})
export default class App extends Component {
  fetchBookings () {
    this.props.dispatch((dispatch) => {
      fetch("http://kronox.mah.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=m&intervallAntal=6&sokMedAND=false&sprak=SV&resurser=p.THDTA14h%2C")
      .then((response) => {
         dispatch({
           type: "BOOKINGS_BODY",
           payload: response.text()
         })
      })
      .catch((err) => {
        dispatch({type: "FETCH_BOOKINGS_ERROR", payload: err});
      })
    });
  }

  render() {
    if (!this.props.bookings.list.length) {
      let thing;
      if (this.props.bookings.loading) {
        thing = (<ActivityIndicator
          size="large"
        />);

      } else {
        thing = (<Button
          onPress={this.fetchBookings.bind(this)}
          title="Load bookings"
          color="#841584"
        />);
      }
      return (<View>
          {thing}
      </View>)
    } else {
      const mappedBookings = this.props.bookings.list.map(booking => <BookingComponent text={booking.summary} key={booking.uid}/>)
      return (
        <ScrollView>
          {mappedBookings}
        </ScrollView>
      );
    }
  }
}


AppRegistry.registerComponent('App', () => App);
