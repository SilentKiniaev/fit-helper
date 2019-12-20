import {combineReducers} from 'redux';
import products from './prouducts';
import searchQuery from './searchQuery';
import currentTab from './currentTab';

export default combineReducers({
   products, searchQuery, currentTab
});