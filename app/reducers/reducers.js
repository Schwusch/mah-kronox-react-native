import { combineReducers } from 'redux';
import ical from '../utils/ical'

const bookingsReducer = (state={
  list: [],
  loading: false
  }, action) => {

  if (action.type === "BOOKINGS_BODY_PENDING") {
    state = {...state, loading: true};
  } else if (action.type === "BOOKINGS_BODY_FULFILLED") {
    let bookingsMap = ical.parseICS(action.payload);
    console.log(bookingsMap);
    let bookingsList = [];
    for (key in bookingsMap) {
      bookingsList.push(bookingsMap[key])
    }
    state = {...state, loading: false, list: bookingsList};
  }
  return state;
}

const programsReducer = (state=[], action) => {
  return state;
}

export default reducers = combineReducers({
  bookings: bookingsReducer,
  programs: programsReducer
})
