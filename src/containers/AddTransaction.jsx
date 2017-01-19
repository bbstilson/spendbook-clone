import TransactionTypeToggle from '../components/add-transaction/TransactionTypeToggle';
import TransactionAmount from '../components/add-transaction/TransactionAmount';
import TransactionNotes from '../components/add-transaction/TransactionNotes';
import CategoryMap from '../components/add-transaction/CategoryMap';

import { changeView } from '../redux/modules/app';
import { updateTransaction, finalizeTransaction } from '../redux/modules/transaction';
import View from '../constants/View';
import TransactionType from '../constants/TransactionType';
import expenseCategories from '../models/expenseCategories';
import incomeCategories from '../models/incomeCategories';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './ContainerView.css';
import './AddTransaction.css';

class AddTransaction extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    updateTransaction: PropTypes.func.isRequired,
    finalizeTransaction: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.confirmTransaction = this.confirmTransaction.bind(this);
  }

  confirmTransaction() {
    const { finalizeTransaction, changeView, uid, transaction } = this.props;

    finalizeTransaction(uid, transaction);
    changeView(View.OVERVIEW);
  }

  render() {
    const { type, category, amount, notes, changeView, updateTransaction } = this.props;

    return (
      <div className="overview">
        <div className="header">
          <button onClick={() => { changeView(View.OVERVIEW) }}>{'<'}</button>
          <h1>Add Transaction</h1>
          <button onClick={this.confirmTransaction}>Done</button>
        </div>
        <div>
          <TransactionTypeToggle
              selected={type === TransactionType.EXPENSE}
              onClick={() => updateTransaction('type', TransactionType.EXPENSE) }>
            {TransactionType.EXPENSE}
          </TransactionTypeToggle>
          <span className="transaction-type--spacer">|</span>
          <TransactionTypeToggle
              selected={type === TransactionType.INCOME}
              onClick={() => updateTransaction('type', TransactionType.INCOME) } >
            {TransactionType.INCOME}
          </TransactionTypeToggle>
        </div>
        <TransactionAmount
            amount={amount}
            type={type.toLowerCase()}
            updateAmount={(e) => { updateTransaction('amount', e.target.value) }} />
        {
          type === TransactionType.EXPENSE
            ? <CategoryMap
                selected={category}
                category={TransactionType.EXPENSE}
                categories={expenseCategories}
                updateCategory={(cat) => { updateTransaction('category', cat) }} />
            : <CategoryMap
                selected={category}
                category={TransactionType.INCOME}
                categories={incomeCategories}
                updateCategory={(cat) => { updateTransaction('category', cat) }} />
        }
        <TransactionNotes text={notes} updateNotes={(e) => { updateTransaction('notes', e.target.value) }} />
      </div>
    );
  }
}

function mapStateToProps({ transaction, auth }) {
  return {
    uid: auth.authedId,
    transaction: transaction.newTransaction,
    type: transaction.newTransaction.get('type'),
    category: transaction.newTransaction.get('category'),
    icon: transaction.newTransaction.get('icon'),
    amount: transaction.newTransaction.get('amount'),
    notes: transaction.newTransaction.get('notes')
  }
}

export default connect(mapStateToProps, { changeView, updateTransaction, finalizeTransaction })(AddTransaction)
