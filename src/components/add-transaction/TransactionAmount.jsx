import React, { PropTypes } from 'react';
import './TransactionAmount.css';

const TransactionAmount = ({ amount, updateAmount }) => (
  <input className="transaction-amount" type="number" value={amount} onChange={updateAmount} />
);

TransactionAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  updateAmount: PropTypes.func.isRequired
};

export default TransactionAmount;
