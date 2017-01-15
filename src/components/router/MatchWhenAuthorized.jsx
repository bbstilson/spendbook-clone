import React, { PropTypes } from 'react';
import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

const MatchWhenAuthorized = ({ component: Component, authed, ...rest }) => (
  <Match
    {...rest}
    render={(props) => authed === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
);

MatchWhenAuthorized.propTypes = {
  authed: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

export default MatchWhenAuthorized;
