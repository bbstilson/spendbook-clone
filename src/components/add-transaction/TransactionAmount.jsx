import React, { PropTypes } from 'react';
import './TransactionAmount.css';

const TransactionAmount = ({ type, amount, updateAmount }) => (
  <input className={`transaction-amount ${type}`} type="text" value={amount} onChange={updateAmount} />
);

TransactionAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  updateAmount: PropTypes.func.isRequired
};

export default TransactionAmount;
