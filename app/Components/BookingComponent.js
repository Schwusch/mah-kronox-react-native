import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import moment from 'moment'
import * as actionTypes from '../constants/actionTypes';

const style = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    backgroundColor: '#ffffff',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 7
  },
  right: {
    flex: 4,
    flexDirection: 'column',
  },
});

export default class BookingComponent extends Component {
  componentDidMount() {
    const signatures = this.props.booking.signatures
    const allSignatures = this.props.signatures
    for(signature of signatures) {
      if(allSignatures[signature] == undefined || allSignatures[signature].name == undefined) {
        this.props.dispatch({
          type: actionTypes.GET_SIGNATURE,
          payload: signature
        })
      }
    }
  }

  render() {
    const booking = this.props.booking
    const start = moment(booking.start)
    const end = moment(booking.end)
    const signatures = booking.signatures
    const allSignatures = this.props.signatures

    let teacherNamesString = ""
    let teacherNames = []
    for(signature of signatures) {
      if(allSignatures[signature] !== undefined && allSignatures[signature].name !== undefined) {
        teacherNames.push(allSignatures[signature].name)
      }
    }

    for(let i = 0; i < teacherNames.length; i++) {
      if (i === 0) {
        teacherNamesString += teacherNames[i]
      } else {
        teacherNamesString += ", " + teacherNames[i]
      }
    }


    return (
      <View style={style.box}>
        <View style={style.left}>
          <Text style={{color: '#560027', fontWeight: 'bold',}}>
            {start.format('HH:mm')}
          </Text>
          <Text style={{fontWeight: 'bold', color: '#bc477b'}}>
            {end.format('HH:mm')}
          </Text>
          <Text style={{color: '#880e4f',}}>
            {booking.location}
          </Text>
        </View>
        <View style={style.right}>
          <Text>{booking.course}</Text>
          <Text style={{color: "darkgray"}}>{teacherNamesString}</Text>
          <Text>{booking.moment}</Text>
        </View>
      </View>
    );
  }
}
