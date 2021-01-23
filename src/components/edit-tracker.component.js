import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTracker extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResolvedStatus = this.onChangeResolvedStatus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        
        this.state = {
            username: '',
            description: '',
            date: new Date(),
            resolved:false,
            users: []
        }
    }

    // didmount loads right before anything gets displayed on the page
    componentDidMount() {
        axios.get('http://localhost:5000/trackers/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    date: new Date(res.data.date),
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChangeResolvedStatus(e) {
        this.setState({
            resolved: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const tracker = {
            username: this.state.username,
            description: this.state.description,
            resolved:  this.state.resolved,
            date: this.state.date,
        };

        console.log(tracker);

        axios.post('http://localhost:5000/trackers/update/' +  this.props.match.params.id, tracker)
            .then(res => (console.log(res.data)));
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Bug Tracker</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Date: </label>
                        <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-check-label" htmlFor="">Is Resolved?</label>
                        <select className="form-check-input" type="checkbox" value={this.state.resolved} onChange={this.onChangeResolvedStatus}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Bug Tracker" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}