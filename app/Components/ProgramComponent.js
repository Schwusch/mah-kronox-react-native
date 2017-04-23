import React, { Component } from 'react';
import { REMOVE_PROGRAM } from '../constants/actionTypes';
import {Text, ListItem, Right, Body, Icon, Button} from 'native-base';
import { Alert } from 'react-native';

export default class ProgramComponent extends Component {
  onPressYes() {
    this.props.dispatch({
      type: REMOVE_PROGRAM,
      payload: { name: this.props.name }
    })
  }

  render() {
    const program = this.props.program;
    return (
        <ListItem icon>
            <Body>
              <Text>{program}</Text>
            </Body>
            <Right>
              <Button transparent danger
                onPress={() => Alert.alert(
                  'Ta Bort',
                  `Ta bort ${program} från listan?`,
                  [
                    {text: "Ja", onPress: this.onPressYes.bind(this)},
                    {text: "Nej", onPress: () => {}}
                  ]
                )}>
                  <Text> Ta Bort</Text>
              </Button>
            </Right>
        </ListItem>
    );
  }
}
