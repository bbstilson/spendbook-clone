import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Nav.css';

const Nav = ({ type, onClick, children }) => (
  <div className={classnames('nav', type)} onClick={onClick}>{children}</div>
);

Nav.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Nav;
