import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Text, Icon } from 'native-base';

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
    const icon = this.props.alreadyAdded ? "checkmark-circle" : "add-circle"
    const color = this.props.alreadyAdded ? "green" : "black"
    return (
      <ListItem avatar onPress={this.onPress.bind(this)}>
        <Left>
          <Icon name={icon} active={this.props.alreadyAdded} style=
            {{
              justifyContent: 'center',
              color: color,
            }}/>
          </Left>
          <Body>
            <Text>{this.props.data.label}</Text>
          </Body>
      </ListItem>
    );
  }
}
