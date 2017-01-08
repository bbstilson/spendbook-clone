import { changeView, addTransaction } from '../redux/modules/app';
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
    addTransaction() {
      dispatch(addTransaction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionOverview)
