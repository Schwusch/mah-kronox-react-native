import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Text, Icon, CheckBox } from 'native-base';

export default class AutoCompleteComponent extends Component {
  onPress() {
    if(!this.props.alreadyAdded) {
      this.props.dispatch({
        type: `ADD_${this.props.kindOfEntry}`,
        payload: {name: this.props.data.value, type: this.props.kindOfEntry}
      });
    }
  }
  render() {
    return (
      <ListItem onPress={this.onPress.bind(this)}>
        <CheckBox checked={this.props.alreadyAdded} />
        <Text>{this.props.data.label}</Text>
      </ListItem>
    );
  }
}
