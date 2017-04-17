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

var styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

@connect((store) => {
  return {
    programs: store.programs
  }
})
export default class AddProgramComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  takeCareOfInput() {
    const programInput = this.state.text;
    this.props.dispatch({
      type: "ADD_PROGRAM",
      payload: programInput
    });
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Adding program here?</Text>
        <TextInput
          style={{height: 40, padding: 10, width: 300}}
          placeholder="Type here to add a program!"
          onChangeText={(text) => this.setState({text})}
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
