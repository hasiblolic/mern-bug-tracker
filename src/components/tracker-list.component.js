import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Tracker = props => (
    <tr>
        <td>{props.tracker.username}</td>
        <td>{props.tracker.description}</td>
        <td>{props.tracker.date.substring(0,10)}</td>
        <td>{props.tracker.resolved.toString()}</td>
        <td>
            <Link to={"/edit/"+props.tracker._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteTracker(props.tracker._id)}}>Delete</a>
        </td>
    </tr>
)

export default class TrackerList extends Component {
    constructor(props) {
        super(props);
        this.deleteTracker = this.deleteTracker.bind(this);

        this.state = { trackers: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/trackers/')
            .then(res => {
                this.setState({ trackers: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteTracker(id) {
        axios.delete('http://localhost:5000/trackers/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          trackers: this.state.trackers.filter(el => el._id !== id)
        })
      }

    trackersList() {
        return this.state.trackers.map(currentTracker => {
            return <Tracker tracker={currentTracker} deleteTracker={this.deleteTracker} key={currentTracker._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Bug Trackers</h3>
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
                        { this.trackersList() }
                    </tbody>
                </table>
            </div>
        )
    }
}