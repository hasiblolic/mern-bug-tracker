import { combineReducers } from "redux";
import trackerReducer from './trackerReducer';
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
  authReducer,
  errorReducer,
  trackerReducer
});