import React, { PropTypes } from 'react';

const TransactionAmount = ({ amount, updateAmount }) => (
  <input type="number" value={amount} onChange={updateAmount} />
);

TransactionAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  updateAmount: PropTypes.func.isRequired
};

export default TransactionAmount;
