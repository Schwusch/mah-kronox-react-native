import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import BookingComponent from './BookingComponent';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

var styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
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
    this.props.dispatch((dispatch) => {
      fetch("https://kronox.mah.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=m&intervallAntal=6&sokMedAND=false&sprak=SV&resurser=p.THDTA15h")
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
          title="LOAD SHEDULE"
          color="#841584"
          key="loadStuff"
        />);
      }
    } else {
      let mappedBookings = this.props.bookings.list.map(booking => <BookingComponent booking={booking} key={booking.uid}/>);
      stuffToRender = stuffToRender.concat(mappedBookings);
    }
    const programs = this.props.programs.map(program => (<Text key={program}>{program}</Text>));
    return (
      <Swiper showsButtons={true} loop={false}>
        <View style={{marginTop: 70}}>
          <ScrollView>
            {stuffToRender}
          </ScrollView>
        </View>
        <View style={styles.settings}>
          <Text style={styles.text}>Here will be settings</Text>
          {programs}
          <Button
            onPress={Actions.addProgram}
            title="Add program or course"
            color="#841584"
            key="addProgram"
          />
        </View>
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
