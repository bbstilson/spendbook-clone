import TransactionTypeToggle from '../components/add-transaction/TransactionTypeToggle';
import ExpenseCategories from '../components/add-transaction/ExpenseCategories';
import IncomeCategories from '../components/add-transaction/IncomeCategories';

import { View, changeView } from '../redux/modules/app';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './ContainerView.css';
import './AddTransaction.css';

const TransactionType = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME'
};

class AddTransaction extends Component {
  static propTypes = {
    changeView: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      transactionType: TransactionType.EXPENSE,
      category: 'Food'
    }
    this.updateTransactionType = this.updateTransactionType.bind(this);
  }

  updateTransactionType(transactionType) {
    this.setState({ transactionType });
  }

  updateCategory(category) {
    this.setState({ category });
  }

  render() {
    const { transactionType } = this.state;
    const { changeView } = this.props;

    return (
      <div className="overview">
        <div className="header">
          <button onClick={() => { changeView(View.OVERVIEW) }}>{'<'}</button>
          <h1>Add Transaction</h1>
          <button onClick={() => { changeView(View.CONFIRM_TRANSACTION) }}>Next</button>
        </div>
        <div>
          <TransactionTypeToggle
              selected={transactionType === TransactionType.EXPENSE}
              onClick={() => { this.updateTransactionType(TransactionType.EXPENSE) }}
              value={TransactionType.EXPENSE} />
          <span className="transaction-type--spacer">|</span>
          <TransactionTypeToggle
              selected={transactionType === TransactionType.INCOME}
              onClick={() => { this.updateTransactionType(TransactionType.INCOME) }}
              value={TransactionType.INCOME} />
        </div>
        {
          transactionType === TransactionType.EXPENSE
            ? <ExpenseCategories updateCategory={this.updateCategory} />
            : <IncomeCategories updateCategory={this.updateCategory} />
        }
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeView(view) {
      dispatch(changeView(view));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
