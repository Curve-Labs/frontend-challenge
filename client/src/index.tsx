import React from 'react';
import ReactDOM from 'react-dom';
import './style.min.css'
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import ThemeWrapper from './pages/components/ThemeWrapper';

ReactDOM.render(
  <ThemeWrapper>
    <Routes />
  </ThemeWrapper>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
