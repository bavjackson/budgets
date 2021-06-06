import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import HomePage from './pages/Home';
import CreateBudgetPage from './pages/CreateBudget';
import NotFoundPage from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create" component={CreateBudgetPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
