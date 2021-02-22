import { combineReducers } from "redux";
import trackers from './trackerReducer';
import auth from "./authReducers";
import errors from "./errorReducers";

export default combineReducers({
  auth,
  errors,
  trackers
});