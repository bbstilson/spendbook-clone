import TransactionOverview from './containers/TransactionOverview';
import AddTransaction from './containers/AddTransaction';
import ConfirmTransaction from './containers/ConfirmTransaction';

import { View } from './redux/modules/app';

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
// red: #ff6150
// blue: #69bebe
// white: #ffffff
