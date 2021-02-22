import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';

// styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// components
import Navbar from './components/navbar';
import TrackerList from './components/tracker-list';
import UpdateTracker from './components/edit-tracker';
import CreateTracker from './components/create-tracker';
import Auth from './components/auth';
import PrivateRoute from './components/private-routes/private-route';
import Dashboard from './components/dashboard';
import store from './store/store';
import { LOGOUT } from './actions/types';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch(loadUser());

    // log user out of all tabs
    window.addEventListener('storage', () => {
      if(!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />

        <Route path="/" exact component={TrackerList} />
        <Route path="/edit/:id" component={UpdateTracker} />
        <Route path="/create" component={CreateTracker} />
        
        <Route path="/auth" component={Auth} />
        
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
