import {createStore as store} from 'redux';
import reducer from '../reducer';
import middleware from '../middleware';

export default store(reducer, {}, middleware);