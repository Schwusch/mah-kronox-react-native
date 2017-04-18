import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchAllBookings } from '../actions/fetchBookings';

const style = StyleSheet.create({
  box: {
    backgroundColor: '#9DD6EB',
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textbox: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 5,
  },
  text: {
    flex: 1,
  }
});

export default class AutoCompleteComponent extends Component {
  onPress() {
    if(!this.props.alreadyAdded) {
      this.props.dispatch({
        type: `ADD_${this.props.kindOfEntry}`,
        payload: this.props.data.value
      });
      fetchAllBookings();
    }
  }
  render() {
    const iconName = this.props.alreadyAdded ? "check-square-o" : "square-o";
    return (
      <TouchableHighlight onPress={this.onPress.bind(this)}>
        <View style={style.box}>
          <Icon name={iconName} size={20} color="#900" />
          <Text>{this.props.data.label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('AutoCompleteComponent', () => AutoCompleteComponent);
