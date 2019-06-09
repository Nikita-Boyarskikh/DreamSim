import { ADD_SCHEME_ELEMENT, SET_SCHEME_ELEMENTS } from 'app/constants/actionTypes';
import { handleSetNormalizedData } from 'app/lib/api';
import { elementSchema } from 'app/lib/api/schema/element';

export default handleSetNormalizedData(SET_SCHEME_ELEMENTS, elementSchema, {
  [ADD_SCHEME_ELEMENT]() {
    // TODO
  }
});
