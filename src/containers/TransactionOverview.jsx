import Transaction from '../components/overview/Transaction';
import Nav from '../components/navigation/Nav';

import { changeView } from '../redux/modules/app';
import { addTransaction } from '../redux/modules/transaction';
import View from '../constants/View';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContainerView.css';
import './TransactionOverview.css';

class TransactionOverview extends Component {
  createNewTransaction = () => {
    const { changeView, addTransaction } = this.props;

    changeView(View.ADD_TRANSACTION);
    addTransaction();
  }

  render() {
    return (
      <div className="overview">
        <div className="header transaction-overview--header">
          <h1 className="title"><em>Balanced</em></h1>
          <Nav type="add" onClick={this.createNewTransaction} />
        </div>
        <div className="total">
          <p className="current">Current total</p>
          <h1>{this.props.total}</h1>
        </div>
        {this.props.transactions.map((t) => <Transaction key={t.tid} transaction={t} />)}
      </div>
    );
  }
}

function mapStateToProps({ transaction, auth, database }) {
  return {
    name: database.name,
    total: database.total,
    uid: auth.uid,
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
