import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './TransactionTypeToggle.css';

function getClassnames(selected) {
  return classnames('transaction-type', { selected });
}
const TransactionTypeToggle = ({ selected, children, onClick }) => (
  <p className={getClassnames(selected)} onClick={onClick}>{children}</p>
);

TransactionTypeToggle.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TransactionTypeToggle;
