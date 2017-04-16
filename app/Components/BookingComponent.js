import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';

const style = StyleSheet.create({
  box: {
    backgroundColor: '#527FE4',
    borderColor: '#000033',
    borderWidth: 1,
    margin: 5,
    padding: 5
  }
});

export default class BookingComponent extends Component {
  render() {
    return (
      <View style={style.box}>
        <Text>{this.props.booking.summary}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('BookingComponent', () => BookingComponent);
