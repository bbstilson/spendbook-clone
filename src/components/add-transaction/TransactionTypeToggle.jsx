import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './TransactionTypeToggle.css';

function getClassnames(selected) {
  return classnames('transaction-type', { selected });
}
const TransactionTypeToggle = ({ selected, value, onClick }) => (
  <p className={getClassnames(selected)} onClick={onClick}>{value}</p>
);

TransactionTypeToggle.propTypes = {
  selected: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TransactionTypeToggle;
