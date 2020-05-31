import { combineReducers } from 'redux';
import elements from './elements';
import schemes from './schemes';
import chat from './chat';

export default combineReducers({
  elements,
  schemes,
  chat,
});
