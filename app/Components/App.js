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
      fetch("https://kronox.mah.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=m&intervallAntal=6&sokMedAND=false&sprak=SV&resurser=p.THDTA14h%2C")
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
    let stuffToRender = [];
    if (!this.props.bookings.list.length) {
      if (this.props.bookings.loading) {
        stuffToRender.push(<ActivityIndicator
          size="large"
          key="loadingStuff"
        />);

      } else {
        stuffToRender.push(<Button
          onPress={this.fetchBookings.bind(this)}
          title="Load bookings"
          color="#841584"
          key="loadStuff"
        />);
      }
    } else {
      let mappedBookings = this.props.bookings.list.map(booking => <BookingComponent booking={booking} key={booking.uid}/>);
      stuffToRender = stuffToRender.concat(mappedBookings);
    }
    return (
      <ScrollView style={{paddingTop: 25}}>
        {stuffToRender}
      </ScrollView>
    );
  }
}


AppRegistry.registerComponent('App', () => App);
