import { Observable } from 'rxjs';
import * as actionTypes from '../constants/actionTypes';

function log(data) {
  return {
    type: actionTypes.ADD_SIGNATURE,
    data
  };
}

export const fetchSignatureEpic = (action$, store) =>
  action$.ofType(actionTypes.GET_SIGNATURE)
    .distinct(function (x) { return x.payload; })
    .mergeMap((action) =>
      Observable.from(fetchSignature(action.payload))
        .map(log)
    );

const fetchSignature = (signature) =>
  fetch(`https://kronox.mah.se/ajax/ajax_autocompleteResurser.jsp?typ=signatur&endastForkortningar=true&term=${signature}`)
    .then((response) => response.json());
