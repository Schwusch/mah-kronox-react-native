import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  box: {
    backgroundColor: '#9DD6EB',
    margin: 5,
    padding: 5
  }
});

export default class ProgramComponent extends Component {
  render() {
    const program = this.props.program;
    return (
      <View>
        <Text>{program}</Text>
        <Icon.Button name="remove" backgroundColor="#3b5998" onPress={() => Alert.alert(
            'Delete',
            "Delete " + program + " from the list?",
            [
              {text: "Yes", onPress: () => console.log('"Yes" pressed')},
              {text: "No", onPress: () => console.log('"No" pressed'), style: 'cancel'}
            ]
          )} />
      </View>
    );
  }
}

AppRegistry.registerComponent('ProgramComponent', () => ProgramComponent);
