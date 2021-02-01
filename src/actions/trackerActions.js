import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import * as api from '../utils/api.js';

import {
    GET_TRACKERS,
    CREATE_TRACKER,
    UPDATE_TRACKER,
    DELETE_TRACKER,
} from "./types";

export const getTrackers = () => async (dispatch) => {
    try {
        const { data } = await api.getTrackers();
        dispatch({ type: GET_TRACKERS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createTracker = (tracker) => async (dispatch) => {
    try {
        const { data } = await api.createTracker(tracker);

        dispatch({ type: CREATE_TRACKER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateTracker = (id, updatedTracker) => async (dispatch) => {
    try {
        const { data } = await api.updateTracker(id, updateTracker);
        dispatch({ type: UPDATE_TRACKER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTracker = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteTracker(id);
        dispatch({ type: DELETE_TRACKER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}