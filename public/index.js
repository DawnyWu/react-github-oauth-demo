import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Github from './components/Github'
ReactDOM.render(
  <div className="container">
   <Github/>
  </div>
  , document.getElementById('body'));
