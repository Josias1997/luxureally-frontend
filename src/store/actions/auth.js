import * as actionTypes from './actionTypes';
import axios from './../../instanceAxios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const login = token => {
    return {
        type: actionTypes.LOGIN,
        payload: {
            token: token
        }
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};


export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: {
            error: error
        }
    };
};


export const authenticate = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/api/auth/login', {
            username: username,
            password: password
        }).then(({data}) => {
            generateToken(data.token);
            dispatch(login(data.token));
        }).catch(err => {
            dispatch(authFailed(err));
        })
    }
};


export const checkAuthState = () => {
    return dispatch => {
        const expirationDate = localStorage.getItem('expirationDate');
        if (Date.now() > expirationDate) {
            localStorage.setItem('token', null);
            dispatch(logout()); 
        } else {
            const token = localStorage.getItem('token');
            dispatch(login(token));
        }
    };
};


const generateToken = token => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', Date.now() + (3600 * 1000));
};
