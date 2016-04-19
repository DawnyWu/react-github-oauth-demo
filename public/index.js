import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Github from './components/Github'
import List from './components/List'

ReactDOM.render(
  <div className="container">
    <div className="page-header">
      <h1>React List Demo</h1>
    </div>
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <List/>
      </div>
    </div>
  </div>
  , document.getElementById('body'));
