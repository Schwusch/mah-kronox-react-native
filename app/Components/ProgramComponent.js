import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { REMOVE_PROGRAM } from '../constants/actionTypes'

const style = StyleSheet.create({
  box: {
    backgroundColor: '#9DD6EB',
    margin: 5
  }
});

export default class ProgramComponent extends Component {
  onPressYes() {
    this.props.dispatch({
      type: REMOVE_PROGRAM,
      payload: this.props.name
    })
  }

  render() {
    const program = this.props.program;
    return (
      <View style={style.box}>
        <Icon.Button name="minus-circle" backgroundColor="#3b5998" onPress={() => Alert.alert(
            'Ta Bort',
            `Ta bort ${program} från listan?`,
            [
              {text: "Ja", onPress: this.onPressYes.bind(this)},
              {text: "Nej", onPress: () => {}}
            ]
          )}>
          {program}
          </Icon.Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('ProgramComponent', () => ProgramComponent);
