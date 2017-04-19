import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgramComponent from './ProgramComponent';
import * as actionTypes from '../constants/actionTypes';

var styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#841584',
    fontWeight: 'bold',
  }
})

export default class App extends Component {

  onSwitch(value) {
    this.props.dispatch({
      type: actionTypes.SET_SHOW_SEPARATE_SCHEDULES,
      payload: value
    })
  }

  render() {
    const programs = this.props.programs.map(program =>
      <ProgramComponent dispatch={this.props.dispatch} program={program} key={program}/>
    );

    return (
      <View style={styles.settings}>
        <Text style={styles.text}>
          Visa scheman i separata flikar
        </Text>
        <Switch
          onValueChange={this.onSwitch.bind(this)}
          style={{marginBottom: 10}}
          value={this.props.settings.separateSchedules} />
        {programs}
      </View>
    )
  }
}
