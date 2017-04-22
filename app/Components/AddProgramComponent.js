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
    backgroundColor: '#EFF4FF',
  },
  textinput: {
    flex: 1,
    height: 40,
    padding: 10,
    width: 300
  },
  wrapper: {
    justifyContent: 'center',
    height: 90,
    flex: 1
  },
  autocompletes: {
    flex: 7
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
        alreadyAdded={this.props.programs.filter(program => entry.value === program.name).length > 0}
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
        <View style={styles.wrapper}>
          <SegmentedControls
            backTint= {'#FFFFFF'}
            tint={'#A591C1'}
            options={ ["Program", "Kurs"] }
            onSelection={ this.setSelectedOption.bind(this) }
            selectedOption={ this.state.selectedOption }
          />
          <TextInput
            style={styles.textinput}
            placeholder="Skriv här!"
            onChangeText={ this.textChange.bind(this) }
          />
        </View>
        <View style={styles.autocompletes}>
          {toBeRendered}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('AddProgramComponent', () => AddProgramComponent);
