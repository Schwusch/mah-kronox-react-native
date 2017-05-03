import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScheduleComponent from './ScheduleComponent';
import SettingsComponent from './SettingsComponent';
import AddProgramComponent from './AddProgramComponent'
import * as actionTypes from '../constants/actionTypes';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  Tab,
  Tabs,
  Header,
  Footer,
  ScrollableTab,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Spinner,
  Text,
  StyleProvider
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { InteractionManager, View, Dimensions } from 'react-native';
import { fetchAllBookings } from '../actions/fetchBookings'

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings,
    autocomplete: store.autocomplete
  }
})
export default class AllSchedules extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {renderPlaceholderOnly: true};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  produceStuffToRender() {
    let toRender;
    let title;
    const programs= this.props.programs;
    if(programs.length === 0) {
      const dimensions = Dimensions.get('window');
      toRender = (
        <Content>
          <View style={{
            flex:1,
            height: dimensions.height,
            width: dimensions.width,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Button
              style={{ alignSelf: 'center' }}
              info
              rounded
              onPress={() => {
                Actions.AddPrograms();
              }}
              >
              <Text>Lägg till schema</Text>
            </Button>
          </View>
        </Content>
      );
    } else if(programs.length === 1) {
      const program = programs[0];
      const name = program.type === "PROGRAM" ? program.name : program.name.trim().slice(0, -1);
      title = name;
      toRender = (
        <ScheduleComponent
          specificProgram={program.name}
          bookings={this.props.bookings}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
      )
    } else if(this.props.settings.separateSchedules){
      let swipes = [];
      for(program of programs) {
        title = "Scheman"
        const name = program.type === "PROGRAM" ? program.name : program.name.trim().slice(0, -1);
        swipes.push(
          <Tab heading={name} key={name}>
            <ScheduleComponent
              specificProgram={program.name}
              bookings={this.props.bookings}
              programs={this.props.programs}
              dispatch={this.props.dispatch}
              settings={this.props.settings}
            />
          </Tab>
        )

        toRender = (
          <Tabs>
            {swipes}
          </Tabs>
        );
      }
    } else {
      title = "Alla scheman";
      toRender = (
        <ScheduleComponent
          key="All_Schedules"
          bookings={this.props.bookings}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
      )
    }
    let spinner = this.props.bookings.loading ?
    <Spinner color='gray'/> :
    (<Button
      transparent
      onPress={() => {
        fetchAllBookings()
      }}
      >
      <Icon name="refresh" />
    </Button>)

    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header hasTabs=
            {
              this.props.programs.length > 1 &&
              !this.props.settings.separateSchedules
            }>
            <Left>
              { spinner }
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                  Actions.Settings();
                }}
                >
                <Icon name="settings" />
              </Button>
            </Right>
          </Header>
          {toRender}
        </Container>
      </StyleProvider>
    );
  }

  _renderPlaceholderView() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header>
            <Left>
            </Left>
            <Body>
                <Title>Scheman</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => { Actions.Settings() }}
                >
                <Icon name="settings" />
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
