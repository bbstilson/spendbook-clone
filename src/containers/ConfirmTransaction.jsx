import { View, changeView, addTransaction } from '../redux/modules/app';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './ContainerView.css';

class ConfirmTransaction extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }

  constructor() {
    super();
    this.state = { notes: '' };
  }

  addTransaction() {
    const { addTransaction, transactionType, category, amount } = this.props;

    addTransaction(transactionType, category, amount, this.state.notes);
  }

  render() {
    return (
      <div className="overview">
        <div className="header">
          <button onClick={this.props.changeView.bind(this, View.CONFIRM_TRANSACTION)}>{'<'}</button>
          <h1>Confirm Transaction</h1>
          <button onClick={this.props.addTransaction.bind(this, View.CONFIRM_TRANSACTION)}>Next</button>
        </div>
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
    },
    addTransaction(transactionType, category, amount, notes) {
      dispatch(addTransaction(transactionType, category, amount, notes));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTransaction)
