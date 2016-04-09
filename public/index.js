import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Github from './components/Github'
ReactDOM.render(
  <div className="container">
    <div class="page-header">
      <h1>React Github Oauth Demo</h1>
    </div>
    <div class="row">
    <div class="col-md-2 col-md-offset-5">
      <Github/>
    </div>
  </div>
  </div>
  , document.getElementById('body'));
