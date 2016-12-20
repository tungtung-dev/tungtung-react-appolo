import {setAuthToken} from 'utils/auth';
export const SET_AUTH_USER = 'AUTH/set-auth-user';

export function setAuthUser({token, user}){
    setAuthToken(token);
    return {
        type: SET_AUTH_USER,
        token,
        user
    }
}

export default {setAuthUser}