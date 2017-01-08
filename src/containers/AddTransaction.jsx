import TransactionTypeToggle from '../components/add-transaction/TransactionTypeToggle';
import TransactionAmount from '../components/add-transaction/TransactionAmount';
import CategoryMap from '../components/add-transaction/CategoryMap';

import { changeView, updateTransaction } from '../redux/modules/app';
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
    changeView: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.updateTransaction = this.updateTransaction.bind(this);
  }

  updateTransaction(key, value) {
    this.props.updateTransaction(key, value);
  }

  render() {
    const { type, category, amount, changeView } = this.props;

    return (
      <div className="overview">
        <div className="header">
          <button onClick={() => { changeView(View.OVERVIEW) }}>{'<'}</button>
          <h1>Add Transaction</h1>
          <button onClick={() => { changeView(View.CONFIRM_TRANSACTION) }}>Next</button>
        </div>
        <div>
          <TransactionTypeToggle
              selected={type === TransactionType.EXPENSE}
              onClick={() => this.updateTransaction('type', TransactionType.EXPENSE) }>
            {TransactionType.EXPENSE}
          </TransactionTypeToggle>
          <span className="transaction-type--spacer">|</span>
          <TransactionTypeToggle
              selected={type === TransactionType.INCOME}
              onClick={() => this.updateTransaction('type', TransactionType.INCOME) } >
            {TransactionType.INCOME}
          </TransactionTypeToggle>
        </div>
        <TransactionAmount amount={amount} updateAmount={(e) => { this.updateTransaction('amount', e.target.value) }} />
        {
          type === TransactionType.EXPENSE
            ? <CategoryMap
                selected={category}
                category={TransactionType.EXPENSE}
                categories={expenseCategories}
                updateCategory={(cat) => { this.updateTransaction('category', cat) }} />
            : <CategoryMap
                selected={category}
                category={TransactionType.INCOME}
                categories={incomeCategories}
                updateCategory={(cat) => { this.updateTransaction('category', cat) }} />
        }
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return {
    type: app.newTransaction.get('type'),
    category: app.newTransaction.get('category'),
    amount: app.newTransaction.get('amount')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeView(view) {
      dispatch(changeView(view));
    },
    updateTransaction(key, value) {
      dispatch(updateTransaction(key, value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
