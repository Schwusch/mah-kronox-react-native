import { combineReducers } from 'redux';
import ical from '../utils/ical'
import routes from './routes'

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
const initialProgramState = ["THDTA14h", "THDTA15h", "THDTA16h"];
const programsReducer = (state=initialProgramState, action) => {
  return state;
}

export default reducers = combineReducers({
  routes: routes,
  bookings: bookingsReducer,
  programs: programsReducer
})
