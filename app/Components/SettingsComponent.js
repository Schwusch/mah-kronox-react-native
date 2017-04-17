import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgramComponent from './ProgramComponent';

var styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    marginTop: 64
  },
  text: {
    color: '#841584',
    fontWeight: 'bold',
  }
})

export default class App extends Component {
  render() {
    const programs = this.props.programs.map(program => <ProgramComponent dispatch={this.props.dispatch} program={program} key={program}/>);

    return (
      <View style={styles.settings}>
        <Text style={styles.text}>Inställningar</Text>
        {programs}
        <Icon.Button
          name="plus-circle"
          onPress={Actions.addProgram}
          backgroundColor="#841584"
          key="addProgram"
        >
          Lägg till program eller kurs
        </Icon.Button>
      </View>
    )
  }
}
