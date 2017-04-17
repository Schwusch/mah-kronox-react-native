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

const initialProgramState = ["THDTA15h"];
const programsReducer = (state=initialProgramState, action) => {
  if (action.type === "ADD_PROGRAM") {
    state = state.concat(action.payload);
  } else if (action.type === "REMOVE_PROGRAM") {
    state = state.filter(prgm => prgm !== action.payload);
  }
  return state;
}

export default reducers = combineReducers({
  routes: routes,
  bookings: bookingsReducer,
  programs: programsReducer
})
