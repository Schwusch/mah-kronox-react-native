import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Text, Icon, CheckBox } from 'native-base';

export default class AutoCompleteComponent extends Component {
  onPress() {
    if(!this.props.alreadyAdded) {
      this.props.dispatch({
        type: `ADD_${this.props.kindOfEntry}`,
        payload: {name: this.props.data.value, type: this.props.kindOfEntry}
      });
    } else {
      this.props.dispatch({
        type: `REMOVE_${this.props.kindOfEntry}`,
        payload: {name: this.props.data.value, type: this.props.kindOfEntry}
      });
    }
  }
  render() {
    const iconName = this.props.alreadyAdded ? "md-checkmark-circle" : "md-checkmark-circle-outline";
    return (
      <ListItem onPress={this.onPress.bind(this)}>
        <Left>
          <Text>{this.props.data.label}</Text>
        </Left>
        <Right>
          <Icon name={iconName} />
        </Right>
      </ListItem>
    );
  }
}
