import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  },
  textinput: {
    height: 40,
    padding: 10,
    width: 300
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
        alreadyAdded={this.props.programs.includes(entry.value)}
        dispatch={this.props.dispatch}
        key={entry.value}
        data={entry}/>
      ));

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
          style={styles.textinput}
          placeholder="Skriv här!"
          onChangeText={ this.textChange.bind(this) }
        />
        {toBeRendered}
      </View>
    );
  }
}

AppRegistry.registerComponent('AddProgramComponent', () => AddProgramComponent);
