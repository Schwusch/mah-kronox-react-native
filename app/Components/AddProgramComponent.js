import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  view: {
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
    programs: store.programs
  }
})
export default class AddProgramComponent extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Adding program here?</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('AddProgramComponent', () => AddProgramComponent);
