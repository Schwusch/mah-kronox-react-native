import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import * as actionTypes from '../constants/actionTypes';
import AutoCompleteEntryComponent from './AutoCompleteEntryComponent';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  view: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  }
})

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

  takeCareOfInput() {
    const name = this.state.text;
    this.props.dispatch({
      type: `ADD_${this.state.selectedOption.toUpperCase()}`,
      payload: name
    });
    Actions.pop();
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
    const entries = this.props.autocomplete.data.map(entry => <AutoCompleteEntryComponent key={entry.value} data={entry}/>);

    let toBeRendered;
    if (this.props.autocomplete.loading) {
      toBeRendered = (
        <ActivityIndicator
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      );
    } else {
      toBeRendered = (
        <ScrollView>
          {entries}
        </ScrollView>
      );
    }

    return (
      <View style={styles.view}>
        <SegmentedControls
          options={ ["Program", "Kurs"] }
          onSelection={ this.setSelectedOption.bind(this) }
          selectedOption={ this.state.selectedOption }
        />
        <TextInput
          style={{height: 40, padding: 10, width: 300}}
          placeholder="Skriv här!"
          onChangeText={ this.textChange.bind(this) }
        />
        <Button
          onPress={this.takeCareOfInput.bind(this)}
          title="ADD"
          color="#841584"
          key="addProgram"
          disabled={this.state.text?false:true}
        />
        {toBeRendered}
      </View>
    );
  }
}

AppRegistry.registerComponent('AddProgramComponent', () => AddProgramComponent);
