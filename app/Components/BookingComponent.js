import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';
import moment from 'moment'

const style = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    backgroundColor: '#ffffff',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 7
  },
  right: {
    flex: 4,
    flexDirection: 'column',
  },
});

export default class BookingComponent extends Component {
  render() {
    const start = moment(this.props.booking.start)
    const end = moment(this.props.booking.end)
    return (
      <View style={style.box}>
        <View style={style.left}>
          <Text style={{flex: 1, color: '#560027', fontWeight: 'bold',}}>
            {start.format('HH:mm')}
          </Text>
          <Text style={{flex: 1, fontWeight: 'bold', color: '#bc477b'}}>
            {end.format('HH:mm')}
          </Text>
          <Text style={{flex: 1, color: '#880e4f',}}>
            {this.props.booking.location}
          </Text>
        </View>
        <View style={style.right}>
          <Text>{this.props.booking.course}</Text>
          <Text style={{color: "darkgray"}}>{this.props.booking.moment}</Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('BookingComponent', () => BookingComponent);
