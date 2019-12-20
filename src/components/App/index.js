import React from 'react';
import Header from '../Header/index';
import Content from '../Content/index';
import './style.scss';
import './main.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class App extends React.Component {
    static propTypes = {

    }

    render() {
        return (
            <div className="app">
                <Header/>
                <Content/>
                {/*<footer className="footer"></footer>*/}{/*in developing*/}
            </div>
        );
    }
}

export default connect(null)(App);

