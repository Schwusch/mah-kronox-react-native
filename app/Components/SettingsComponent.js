import React, { Component } from 'react';
import ProgramComponent from './ProgramComponent';
import * as actionTypes from '../constants/actionTypes';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Header,
  Switch,
  Text,
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title
} from 'native-base';

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings,
    autocomplete: store.autocomplete
  }
})
export default class App extends Component {

  onSwitch(value) {
    this.props.dispatch({
      type: actionTypes.SET_SHOW_SEPARATE_SCHEDULES,
      payload: value
    })
  }

  render() {
    const programs = this.props.programs.map(program => {
        const name = program.type === "PROGRAM" ? program.name : program.name.trim().slice(0, -1);
        return <ProgramComponent dispatch={this.props.dispatch} program={name} name={program.name}  key={name}/>
      }
    );

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                onPress={() => { Actions.pop() }}
              />
            </Button>
          </Left>
          <Body>
              <Title>Inställningar</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => { Actions.AddPrograms() }}
              >
              <Icon name="md-add-circle" />
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem icon>
              <Left>
                  <Icon name="md-map" />
              </Left>
              <Body>
                <Text>Separata scheman</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={this.onSwitch.bind(this)}
                  value={this.props.settings.separateSchedules} />
              </Right>
          </ListItem>
          <ListItem itemDivider>
              <Text>Scheman</Text>
          </ListItem>
          {programs}
        </Content>
      </Container>
    )
  }
}
