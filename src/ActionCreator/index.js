import {SEARCH_QUERY, LOAD_ALL_PRODUCTS, SET_CURRENT_TAB} from '../actionTypeConst';

export function searchQuery(query = "") {
    return {
        type: SEARCH_QUERY,
        payload: {
            query
        }
    }
};

export function loadAllProducts() {
    return {
        type: LOAD_ALL_PRODUCTS,
        payload: {},
        callAPI: 'http://localhost:8000/product-list'
    }
}

export function setCurrentTab(current = 1) {
    return {
        type: SET_CURRENT_TAB,
        payload: {
            current
        }
    }
}