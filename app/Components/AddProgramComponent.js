import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  }
})

const fetchAutoComplete = (term) =>
  fetch(`https://kronox.mah.se/ajax/ajax_autocompleteResurser.jsp?typ=${this.state.selectedOption.toLowerCase()}&term=${term}`)
    .then((response) => response.json());

@connect((store) => {
  return {
    programs: store.programs,
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

  render() {
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
          onChangeText={(text) => this.setState({...this.state, text})}
        />
        <Button
          onPress={this.takeCareOfInput.bind(this)}
          title="ADD"
          color="#841584"
          key="addProgram"
          disabled={this.state.text?false:true}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('AddProgramComponent', () => AddProgramComponent);
