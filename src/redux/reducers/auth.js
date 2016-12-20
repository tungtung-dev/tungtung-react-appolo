import {SET_AUTH_USER} from '../actions/authAction';

const initialState = {
    token: '',
    user: {}
}

export default function createReducer(state = initialState, action){
    switch (action.type){
        case SET_AUTH_USER:
            return {
                token: action.token,
                user: action.user
            }
        default:
            return state;
    }
}