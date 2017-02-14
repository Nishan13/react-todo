require('../assets/css/reset.css');
require('../assets/css/style.css');
require('../assets/css/layout.css');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App/>, document.querySelector('#app-container'));
