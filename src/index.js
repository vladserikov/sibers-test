import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
localStorage.setItem('data', JSON.stringify(data))

ReactDOM.render(<App data={data} />, document.getElementById('root'));

