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
    backgroundColor: '#EFF4FF',
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
  },
  textbox: {
    backgroundColor: '#FFFFFF',
    flex: 7,
    margin: 5,
    padding: 5,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});

export default class AutoCompleteComponent extends Component {
  onPress() {
    if(!this.props.alreadyAdded) {
      this.props.dispatch({
        type: `ADD_${this.props.kindOfEntry}`,
        payload: {name: this.props.data.value, type: this.props.kindOfEntry}
      });
      fetchAllBookings();
    }
  }
  render() {
    const iconName = this.props.alreadyAdded ? "check-square-o" : "square-o";
    return (
      <View>
        <TouchableHighlight onPress={this.onPress.bind(this)}>
          <View style={style.box}>
            <View style={style.icon}>
              <Icon name={iconName} size={30} color="#522B47" />
            </View>
            <View style={style.textbox}>
              <Text>{this.props.data.label}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('AutoCompleteComponent', () => AutoCompleteComponent);
