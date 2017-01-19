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
        {/* TODO: replace index key with ID. also, add tid to transaction */}
        {this.props.transactions.map((t, i) => <Transaction key={i} transaction={t} />)}
      </div>
    );
  }
}

function mapStateToProps({ transaction, auth, database }) {
  return {
    username: database.username,
    // uid: auth.authedId,
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
