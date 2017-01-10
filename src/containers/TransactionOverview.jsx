import Transaction from '../components/overview/Transaction';

import { changeView } from '../redux/modules/app';
import { addTransaction } from '../redux/modules/transaction';
import View from '../constants/View';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContainerView.css';

class TransactionOverview extends Component {
  constructor() {
    super();
    this.createNewTransaction = this.createNewTransaction.bind(this);
  }

  createNewTransaction() {
    const { changeView, addTransaction } = this.props;

    changeView(View.ADD_TRANSACTION);
    addTransaction();
  }
  render() {
    return (
      <div className="overview">
        <div className="header">
          <div />
          <h1>Overview</h1>
          <button onClick={this.createNewTransaction}>+</button>
        </div>
        {/* TODO: replace index key with ID. also, add uid to transaction */}
        {this.props.transactions.map((t, i) => <Transaction key={i} transaction={t} />)}
        <pre style={{ textAlign: 'left' }}>{JSON.stringify(this.props.transactions, null, 2)}</pre>
      </div>
    );
  }
}

function mapStateToProps({ transaction }) {
  return {
    transactions: transaction.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeView(view) {
      dispatch(changeView(view));
    },
    addTransaction() {
      dispatch(addTransaction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionOverview)
