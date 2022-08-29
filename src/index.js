import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap-override.scss';
import App from './App';
import UserSignupPage from './pages/UserSignupPage';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './i18n';

ReactDOM.render(<UserSignupPage/>, document.getElementById('root'));

serviceWorker.unregister();
