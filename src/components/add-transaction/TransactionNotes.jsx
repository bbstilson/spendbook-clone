import React, { PropTypes } from 'react';

const TransactionNotes = ({ text, updateNotes }) => (
  <input type="text" value={text} onChange={updateNotes} placeholder="Transaction notes..." />
);

TransactionNotes.propTypes = {
  text: PropTypes.string.isRequired,
  updateNotes: PropTypes.func.isRequired
}

export default TransactionNotes;
