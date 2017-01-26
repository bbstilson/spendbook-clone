import App from './App';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';
import MatchWhenAuthorized from './components/router/MatchWhenAuthorized';
import MatchWhenUnauthorized from './components/router/MatchWhenUnauthorized';
import NoMatch from './components/router/NoMatch';

import BrowserRouter from 'react-router/BrowserRouter';
import { connect } from 'react-redux';
import Miss from 'react-router/Miss';
import React, { PropTypes } from 'react';

const Router = ({ authed }) => (
  <BrowserRouter>
    <div style={{ height: '100%' }}>
      <MatchWhenAuthorized pattern="/" authed={authed} component={App} />
      <MatchWhenUnauthorized pattern="/login" authed={authed} component={Login} />
      <MatchWhenUnauthorized pattern="/signup" authed={authed} component={Signup} />
      <Miss component={NoMatch}/>
    </div>
  </BrowserRouter>
);

Router.propTypes = {
  authed: PropTypes.bool.isRequired
};

function mapStateToProps({ auth }) {
  return {
    authed: auth.isAuthed
  };
}

export default connect(mapStateToProps)(Router);
