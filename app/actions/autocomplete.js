import { Observable } from 'rxjs';
import * as actionTypes from '../constants/actionTypes';

function log(data) {
  console.log("Autocomplete data:", data);
  return {
    type: actionTypes.SET_AUTOCOMPLETE,
    data
  };
}

export const fetchAutocompleteEpic = (action$) =>
  action$.ofType(actionTypes.AUTOCOMPLETE_REQUEST)
    .debounceTime(750)
    .mergeMap((action) =>
      Observable.from(fetchAutocomplete(action.typ, action.term))
        .map(log)
    );

const fetchAutocomplete = (typ, term) =>
  fetch(`https://kronox.mah.se/ajax/ajax_autocompleteResurser.jsp?typ=${typ.toLowerCase()}&term=${term}`)
    .then((response) => response.json());
