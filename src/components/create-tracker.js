import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTracker } from '../actions/trackerActions';

class CreateTracker extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            description: '',
            date: new Date(),
            resolved: false,
            users: []
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const tracker = {
            username: this.state.username,
            description: this.state.description,
            resolved: this.state.resolved,
            date: this.state.date,
        };
        
        createTracker(tracker);
        window.location = '/';
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Create New Bug Tracker</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Is Resolved? </label>
                        <select className="form-select" value={this.state.resolved} onChange={this.onChange}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Bug Tracker" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trackers: state.trackerReducer,
});

export default connect(
    mapStateToProps,
    { createTracker }
)(CreateTracker)