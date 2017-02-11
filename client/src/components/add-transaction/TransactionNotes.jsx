import React, { PropTypes } from 'react';
import './TransactionNotes.css';

const TransactionNotes = ({ text, updateNotes }) => (
  <div className="transaction-notes">
    <h2 className="transaction-notes__title">Transaction Notes</h2>
    <input className="transaction-notes__input" type="text" value={text} onChange={updateNotes} />
  </div>
);

TransactionNotes.propTypes = {
  text: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired
}

export default TransactionNotes;
