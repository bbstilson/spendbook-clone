import { View, changeView } from '../redux/modules/app';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContainerView.css';

class TransactionOverview extends Component {
  render() {
    return (
      <div className="overview">
        <div className="header">
          <div />
          <h1>Transaction Overview</h1>
          <button onClick={this.props.changeView.bind(this, View.ADD_TRANSACTION)}>+</button>
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionOverview)
