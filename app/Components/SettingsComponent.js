import React, { Component } from 'react';
import ProgramComponent from './ProgramComponent';
import * as actionTypes from '../constants/actionTypes';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchAllBookings } from '../actions/fetchBookings'
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { View, InteractionManager } from 'react-native';
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
  Badge,
  Title,
  ActionSheet,
  Separator,
  StyleProvider
} from 'native-base';

const BUTTONS = [
  '3 Månader',
  '6 Månader',
  'Avbryt'
];
const MONTHS = [
  3,
  6
]
@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings,
    autocomplete: store.autocomplete
  }
})
export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {renderPlaceholderOnly: true};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  onSwitch(value) {
    this.props.dispatch({
      type: actionTypes.SET_SHOW_SEPARATE_SCHEDULES,
      payload: value
    })
  }

  produceStuffToRender() {
    const programs = this.props.programs.map(program => {
        const name = program.type === "PROGRAM" ? program.name : program.name.trim().slice(0, -1);
        return <ProgramComponent dispatch={this.props.dispatch} program={name} name={program.name}  key={name}/>
      }
    );

    return (
      <StyleProvider style={getTheme(platform)}>
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
            <Separator bordered>
                <Text>Inställningar</Text>
            </Separator>
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
            <ListItem
              icon
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    title: 'Månader',
                    cancelButtonIndex: 2,
                  },
                  (buttonIndex) => {
                    if(buttonIndex < 2) {
                      this.props.dispatch({
                        type: actionTypes.SET_SETTING_MONTHS,
                        payload: MONTHS[buttonIndex]
                      });
                      fetchAllBookings();
                    }
                  }
                  )}
              >
              <Left>
                  <Icon name="md-clock" />
              </Left>
              <Body>
                <Text>Antal månader</Text>
              </Body>
              <Right>
                <Badge info>
                  <Text>{this.props.settings.months}</Text>
                </Badge>
              </Right>
            </ListItem>
            <Separator bordered>
                <Text>Scheman</Text>
            </Separator>
            {programs}
          </Content>
        </Container>
      </StyleProvider>
    )
  }

  _renderPlaceholderView() {
    return (
      <StyleProvider style={getTheme(platform)}>
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
            <Body>
              <Text>
                Laddar...
              </Text>
            </Body>
          </Content>
        </Container>
      </StyleProvider>
    );
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return this.produceStuffToRender();
  }
}
