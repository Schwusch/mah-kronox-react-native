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
  Text
} from 'native-base';

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings,
    autocomplete: store.autocomplete
  }
})
export default class AllSchedules extends Component {
  render() {
    let toRender;
    let title;
    const programs= this.props.programs;
    if(programs.length === 0) {
      toRender = (
         <Footer>
           <Button
             transparent
             onPress={() => {
               Actions.Settings();
             }}
             >
             <Text>Lägg till schema</Text>
           </Button>
         </Footer>
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
    let spinner = this.props.bookings.loading ? <Spinner color='gray'/> : null

    return (
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
    );
  }
}
