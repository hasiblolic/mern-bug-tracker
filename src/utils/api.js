import axios from 'axios';
import store from '../store/store';
import { GET_ERRORS, LOGOUT } from '../actions/types';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Intercept any errors from the api and check if token is valid.
 * ie Token has expired or is no longer authenticated
 * --logout user if expired
 */

 api.interceptors.response.use(
     res => res,
     err => {
        if(err.response.status === 401) {
            store.dispatch({ type: LOGOUT });
        }

        return Promise.reject(err);
    }
);

// trackers
const trackersEndPoint = '/trackers';
export const createTracker = (newTracker) => api.post(trackersEndPoint, newTracker);
export const getTrackers = () => api.get(trackersEndPoint);
export const updateTracker = (id, updatedTracker) => api.patch(`${trackersEndPoint}/:${id}`, updatedTracker);
export const deleteTracker = (id) => api.delete(`${trackersEndPoint}/:${id}`);

// tracker posts
const trackerPostEndPoint = '/trackers/:id';
export const createTrackerPost = (newPost) => api.post(trackerPostEndPoint, newPost);
export const getTrackerPosts = () => api.get(trackerPostEndPoint);
export const updateTrackerPost = (id, updatedPost) => api.patch(`${trackerPostEndPoint}/:${id}`, updatedPost);
export const deleteTrackerPost = (id) => api.delete(`${trackerPostEndPoint}/:${id}`); 

const userEndpoint = '/users';
export const createUser = (newUser) => api.post(`${userEndpoint}/register`, newUser);
export const getUserByToken = () => api.get(`${userEndpoint}/auth`);
export const loginUser = (formData) => api.post(`${userEndpoint}/auth`, formData);
export const updateUser = (id, updatedUser) => api.patch(`${userEndpoint}/:${id}`, updatedUser);
export const deleteUser = (id) => api.delete(`${userEndpoint}/:${id}`);
