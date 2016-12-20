import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';

export default {
    routing: routerReducer,
    form: formReducer,
    auth
}