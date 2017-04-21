import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  weekday: {
    paddingLeft: 15
  },
  date: {
    paddingRight: 10
  },
  text: {
    color: "#ffffff"
  }
})

export default class ListDateComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.weekday}>
          <Text style={styles.text}>{this.props.weekday}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.text}>{this.props.date}</Text>
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('ListDateComponent', () => ListDateComponent);
