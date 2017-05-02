import store from '../store/store';
import * as actionTypes from '../constants/actionTypes';
import ical from '../utils/ical'
import { mapInFrames } from 'next-frame';

export const fetchBookings = (program) => {
  const state = store.getState();
  const months = state.settings.months;
  const baseUrl = "https://kronox.mah.se/setup/jsp/SchemaICAL.ics";
  const prefix = program.type === "KURS" ? "k" : "p";
  const parameters = `?startDatum=idag&intervallTyp=m&intervallAntal=${months}&sokMedAND=false&sprak=SV&resurser=${prefix}.${program.name}`
  store.dispatch({
    type: actionTypes.BOOKINGS_BODY_PENDING
  });
  store.dispatch(dispatch => {
    fetch(`${baseUrl}${parameters}`)
    .then(response => response.text())
    .then(text => processBookings(text))
    .then(bookings =>
      dispatch({
        type: actionTypes.BOOKINGS_BODY_FULFILLED,
        payload: bookings,
        program
      })
    )
    .catch(err =>
      dispatch({type: actionTypes.FETCH_BOOKINGS_ERROR, payload: err})
    )
  });
}

export const fetchAllBookings = () => {
  for(program of store.getState().programs) {
    fetchBookings(program)
  }
}

function handleBooking(booking) {
  try {
    const summary = booking.summary
    let course = "";
    let signatures = [];
    let moment = ""
    let regParts = /.*?\:\s.*?(?=[a-zA-Z\.]+\:)|.*/g;
    let parts = [];
    let match;

    do {
      match = regParts.exec(summary)
      if (match[0] !== "") {
        parts.push(match[0])
      }
    } while (match[0] !== "");

    for(part of parts) {
      if (part.includes("Kurs.grp: ")) {
        course = part.replace("Kurs.grp: ", "")

      } else if (part.includes("Sign: ")){
        signatures = part.replace("Sign: ", "").trim().split(" ")

      } else if (part.includes("Moment: ")) {
        moment = part.replace("Moment: ", "")
      }
    }

    return {...booking, course: course, signatures: signatures, moment: moment}
  } catch (e) {
    console.log(e, booking);
    return {...booking, course: "", signatures: [], moment: ""}
  }
}

async function processBookings(payload) {
  const bookingsMap = ical.parseICS(payload);
  const bookingsObjectList = Object.keys(bookingsMap).map((val) => bookingsMap[val])
  const bookingsList = await mapInFrames(bookingsObjectList, handleBooking);
  return bookingsList
}
