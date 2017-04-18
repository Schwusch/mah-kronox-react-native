import { combineReducers } from 'redux';
import ical from '../utils/ical'
import routes from './routes'
import * as actionTypes from '../constants/actionTypes'
import { Alert } from 'react-native'

const bookingsReducer = (state={
  programs: {},
  loading: false
  }, action) => {

  if (action.type === actionTypes.BOOKINGS_BODY_PENDING) {
    state = {...state, loading: true};

  } else if (action.type === actionTypes.BOOKINGS_BODY_FULFILLED) {
    let bookingsMap = ical.parseICS(action.payload);
    let bookingsList = [];
    for (key in bookingsMap) {
      bookingsList.push(bookingsMap[key])
    }

    bookingsList.sort((a, b) => {
      return a.start - b.start;
    });
    state.programs = {...state.programs}
    state.programs[action.program] = bookingsList
    state = {...state, loading: false};

  } else if (action.type === actionTypes.FETCH_BOOKINGS_ERROR) {
    Alert.alert("Ingen internetanslutning!")

  } else if (action.type === actionTypes.RESET_BOOKINGS) {
    state = {...state, programs: {}};

  }
  return state;
}

const programsReducer = (state=[], action) => {
  if (action.type === actionTypes.ADD_PROGRAM) {
    state = state.concat(action.payload);
  } else if (action.type === actionTypes.ADD_KURS) {
    state = state.concat(action.payload);
  } else if (action.type === actionTypes.REMOVE_PROGRAM) {
    state = state.filter(prgm => prgm !== action.payload);
  }
  return state;
}

const autocompleteReducer = (state={data: [], loading: false}, action) => {
  if (action.type === actionTypes.SET_AUTOCOMPLETE) {
    action.data.map(obj => obj.label = obj.label.replace(/<(?:.|\n)*?>/gm, ''));
    state = {data: action.data, loading: false};
  } else if (action.type === actionTypes.AUTOCOMPLETE_REQUEST) {
    state = {data: [], loading: true};
  }
  return state;
}

const settingsReducer = (state={separateSchedules: true}, action) => {
  if (action.type === actionTypes.SET_SHOW_SEPARATE_SCHEDULES) {
    state = {...state, separateSchedules: action.payload};
  }
  return state;
}

export default reducers = combineReducers({
  autocomplete: autocompleteReducer,
  routes: routes,
  bookings: bookingsReducer,
  programs: programsReducer,
  settings: settingsReducer
})
