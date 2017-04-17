import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';

const style = StyleSheet.create({
  box: {
    backgroundColor: '#9DD6EB',
    margin: 5,
    padding: 5
  }
});

export default class AutoCompleteComponent extends Component {
  render() {
    return (
      <View style={style.box}>
        <Text style={{fontWeight: 'bold'}}>{this.props.data.value}</Text>
        <Text>{this.props.data.label.replace(/<(?:.|\n)*?>/gm, '')}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('AutoCompleteComponent', () => AutoCompleteComponent);
