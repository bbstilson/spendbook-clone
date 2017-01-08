import TransactionOverview from './containers/TransactionOverview';
import AddTransaction from './containers/AddTransaction';
import ConfirmTransaction from './containers/ConfirmTransaction';

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
      case View.CONFIRM_TRANSACTION:
        return <ConfirmTransaction />;
      default:
        return <TransactionOverview />;
    }
  }

  render() {
    return (
      <div className="app">
        {this.getActiveView()}
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return {
    app,
    activeView: app.activeView
  };
}

export default connect(mapStateToProps)(App)
// red: #ff6150
// blue: #69bebe
// white: #ffffff
