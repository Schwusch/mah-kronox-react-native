import { combineReducers } from 'redux';
import routes from './routes'
import bookings from './bookings'
import programs from './programs'
import autocomplete from './autocomplete'
import settings from './settings'
import * as actionTypes from '../constants/actionTypes'

export default reducers = combineReducers({
  autocomplete: autocomplete,
  routes: routes,
  bookings: bookings,
  programs: programs,
  settings: settings
})
