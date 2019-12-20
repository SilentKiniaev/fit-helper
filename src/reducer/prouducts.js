import {arrToObj} from "../helper"
import {LOAD_ALL_PRODUCTS} from "../actionTypeConst";

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_ALL_PRODUCTS:
            return arrToObj(action.response);
        default: return state;
    }
};
