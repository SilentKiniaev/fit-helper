import {SET_CURRENT_TAB} from "../actionTypeConst";

export default (state = 1, action) => {
    switch(action.type) {
        case SET_CURRENT_TAB: return action.payload.current;
        default: return state;
    }
}