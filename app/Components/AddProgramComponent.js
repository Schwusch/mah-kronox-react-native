import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SegmentedControls } from 'react-native-radio-buttons';
import * as actionTypes from '../constants/actionTypes';
import AutoCompleteEntryComponent from './AutoCompleteEntryComponent';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Item,
  Input,
  Spinner,
  List
} from 'native-base';

@connect((store) => {
  return {
    programs: store.programs,
    autocomplete: store.autocomplete
  }
})
export default class AddProgramComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      selectedOption: "Program"
    };
  }

  setSelectedOption(selectedOption){
    this.setState({
      ...this.state,
      selectedOption
    });
  }

  textChange(text) {
    this.setState({...this.state, text});
    this.props.dispatch({
      type: actionTypes.AUTOCOMPLETE_REQUEST,
      typ: this.state.selectedOption,
      term: text
    });
  }

  render() {
    const entries = this.props.autocomplete.data.map(entry => (
      <AutoCompleteEntryComponent
        kindOfEntry={this.state.selectedOption.toUpperCase()}
        alreadyAdded={this.props.programs.filter(program => entry.value === program.name).length > 0}
        dispatch={this.props.dispatch}
        key={entry.value}
        data={entry}/>
      ));

    let toBeRendered;
    if (this.props.autocomplete.loading) {
      toBeRendered = <Spinner/>;
    } else {
      toBeRendered = entries;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.dispatch({type: actionTypes.RESET_AUTOCOMPLETE})
                Actions.pop();
              }}
              >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
              <Title>Lägg till</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <SegmentedControls
            options={ ["Program", "Kurs"] }
            onSelection={ this.setSelectedOption.bind(this) }
            selectedOption={ this.state.selectedOption }
          />
          <Item underline>
              <Input
                placeholder='Skriv här!'
                onChangeText={ this.textChange.bind(this) }
              />
          </Item>

          <List>
            {toBeRendered}
          </List>
        </Content>
      </Container>
    );
  }
}
