import { ADD_SCHEME, SET_SCHEMES } from 'app/constants/actionTypes';
import { handleSetNormalizedData } from 'app/lib/api';
import { schemeSchema } from 'app/lib/api/schema/scheme';

export default handleSetNormalizedData(SET_SCHEMES, schemeSchema, {
  [ADD_SCHEME]() {
    // TODO
  }
});
