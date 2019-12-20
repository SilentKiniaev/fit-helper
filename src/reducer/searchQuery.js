import {SEARCH_QUERY} from '../actionTypeConst';

export default (store = "", action) => action.type === SEARCH_QUERY ? action.payload.query : store;
