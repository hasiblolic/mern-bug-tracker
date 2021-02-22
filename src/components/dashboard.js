import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Dashboard extends Component {
    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        if(!user){
          return (
            <div>
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
              <br/>
              <button
                onClick={this.onLogoutClick}
                className="btn btn-primary"
                >
                Logout
                </button>
            </div>
            
          );
        } else return (
            <div className="container">
                <h4>
                  <b>Hey there,</b> {user.username}
                </h4>
                <button
                onClick={this.onLogoutClick}
                className="btn btn-primary"
                >
                Logout
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);