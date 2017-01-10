import TransactionOverview from './containers/TransactionOverview';
import AddTransaction from './containers/AddTransaction';

import View from './constants/View';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  getActiveView() {
    switch(this.props.activeView) {
      case View.OVERVIEW:
        return <TransactionOverview />;
      case View.ADD_TRANSACTION:
        return <AddTransaction />;
      default:
        return <TransactionOverview />;
    }
  }

  render() {
    return (
      <div className="app">
        {this.getActiveView()}
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return {
    activeView: app.activeView
  };
}

export default connect(mapStateToProps)(App)
