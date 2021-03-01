import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './css/normalize.css';
import './css/skeleton.css';
import './App.global.css';

import Header from './components/Header';
import Index from './pages/Index';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}
