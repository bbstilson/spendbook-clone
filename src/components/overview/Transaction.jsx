import Icon from '../common/Icon';

import TransactionType from '../../constants/TransactionType';

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './Transaction.css';

function sign(type) {
  return type === TransactionType.EXPENSE ? '- ' : '+ ';
}

const Transaction = ({ transaction: { icon, type, category, amount, notes } }) => (
  <div className="transaction">
    <div className="transaction-info__left">
      <Icon active icon={icon} category={type} />
      <div className="transaction-text">
        <span className="transaction-header">{category}</span>
        <p className="transaction-notes">{notes}</p>
      </div>
    </div>
    <div className="transaction-info__right">
      <p className={classnames('transaction-amount', type.toLowerCase())}>{sign(type)}{amount}</p>
    </div>
  </div>
);

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired
};

export default Transaction;
