import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getTrackers } from '../actions/trackerActions';

const Tracker = ({tracker}) => {
    return (
        <tr>
            <td>{tracker.username}</td>
            <td>{tracker.description}</td>
            <td>{tracker.date.substring(0,10)}</td>
            <td>{tracker.resolved.toString()}</td>
        </tr>
    );
}

const NewTracker = ({tracker}) => {
    return (
        <li className="list-group-item">
            <p>{tracker.username}</p>
            <h4>{tracker.description}</h4>
            <p>opened {tracker.date.substring(0,10)} {tracker.date.substring(11,16)}</p>
        </li>
    )
}

const TrackerList = ({setCurrentId}) => {
    const dispatch = useDispatch();
    
    const trackers = useSelector((state) => state.trackerReducer.trackers);
    if(!trackers.length) dispatch(getTrackers());
    
    return (
        !trackers.length ?
        (
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        ) : 
        (
            <div>
                <h3>Bug Trackers</h3>
                <div className="list-group">
                    {trackers.map((tracker) => (
                        <NewTracker tracker={tracker} key={tracker._id} />
                    ))}
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Resolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            trackers.map((tracker) => (
                                <Tracker tracker={tracker} key={tracker._id} />
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        )
    );
}

export default TrackerList;