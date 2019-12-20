import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../../store';
import {Provider} from 'react-redux';
import App from '../App';

export default function Provide() {
    return (
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    )
}
