import * as actionTypes from '../constants/actionTypes'
import { Alert } from 'react-native'
import ical from '../utils/ical'

export default bookingsReducer = (state={
  programs: {},
  signatures: {},
  loading: false
}, action) => {

  if (action.type === actionTypes.BOOKINGS_BODY_PENDING) {
    state = {...state, loading: true};

  } else if (action.type === actionTypes.BOOKINGS_BODY_FULFILLED) {
    const regCourse = /.*?(?= Sign)/;
    const regSign = /.*?(?= Moment)/;
    const regMoment = /.*?(?= Program)/;

    let bookingsMap = ical.parseICS(action.payload);
    let bookingsList = [];
    for (key in bookingsMap) {
      let summary = bookingsMap[key].summary
      let course;
      let signatures;
      let moment
      try {
        summary = summary.replace("Kurs.grp: ", "");
        course = regCourse.exec(summary)[0];
        summary = summary.replace(course + " Sign: ", "");
        if(summary.includes("Moment")) {
          signatures = regSign.exec(summary)[0];
          summary = summary.replace(signatures + " Moment: ", "");
          signatures = signatures.split(" ");
          moment = regMoment.exec(summary)[0];
        } else {
          signatures = regMoment.exec(summary)[0];
          summary = summary.replace(signatures + " Program: ", "");
          signatures = signatures.split(" ");
          moment = "Ingen Beskrivning";
        }

        const booking = {...bookingsMap[key], course: course, signatures: signatures, moment: moment}
        bookingsList.push(booking)
      } catch (e) {
        console.log(e, bookingsMap[key].summary, summary, course, signatures, moment);
      }
    }
    state.programs = {...state.programs}
    state.programs[action.program.name] = bookingsList
    state = {...state, loading: false};

  } else if (action.type === actionTypes.FETCH_BOOKINGS_ERROR) {
    //Alert.alert("Ingen internetanslutning!")

  } else if (action.type === actionTypes.RESET_BOOKINGS) {
    state = {...state, programs: {}};

  } else if (action.type === actionTypes.REMOVE_PROGRAM) {
    let programs = {...state.programs}
    delete programs[action.payload.name];
    state = {...state, programs: programs};

  } else if (action.type === actionTypes.ADD_SIGNATURE) {
    const signaturehtml = action.data[0].label
    const list = signaturehtml.replace(/<(?:.|\n)*?>/gm, '').split(", ")
    let signatures = {...state.signatures}
    signatures[list[0]] = {name: list[1], loading: false}
    state = {...state, signatures: signatures};
  }

  return state;
}
