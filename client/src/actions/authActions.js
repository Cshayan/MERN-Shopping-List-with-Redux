import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from './types';
import axios from 'axios';
import {
    returnErrors
} from './errorActions';

// Get user details from the token
export const loadUser = () => async (dispatch, getState) => {
    // dispatch user-loading
    dispatch({
        type: USER_LOADING
    });

    const config = tokenConfig(getState);

    try {
        // make request
        const res = await axios.get('/api/v1/users/me', config);
        // dispatch user-loaded
        dispatch({
            type: USER_LOADED,
            payload: res.data.data
        });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    }

}

export const registerUser = ({
    name,
    email,
    password
}) => async dispatch => {

    // headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({
        name,
        email,
        password
    });

    try {
        // make request
        const res = await axios.post('/api/v1/users/register', body, config);
        // dispatch register-success
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// logout user
export const logOut = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// setup token helper function
export const tokenConfig = (getState) => {

    // get the token from localStorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // if token exists add to headers
    if (token) {
        config.headers['Authorization'] = token;
    }

    return config;
}