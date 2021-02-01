import { 
    CREATE_TRACKER,
    UPDATE_TRACKER,
    DELETE_TRACKER,
    GET_TRACKERS,
} from "../actions/types";

const initialState = {
    trackers: {}
};

export default function trackerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRACKERS: return {
        ...state,
        trackers: action.payload,
    }
    case DELETE_TRACKER:
        return action.payload;
    case CREATE_TRACKER:
        return action.payload;
    default:
      return state;
  }
}