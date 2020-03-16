import * as actionTypes from './../actions/actionTypes';

const initialState = {
    token: null,
    loading: false,
    error: null
};

const authStart = (state) => {
    return {
        ...state,
        loading: true
    };
};

const login = (state, action) => {
    return {
        ...state,
        token: action.payload.token,
        loading: false
    };
};

const logout = (state, action) => {
    return {
        ...state,
        token: null,
    };
};

const authFailed = (state, action) => {
    return {
        ...state,
        error: action.payload.error,
        loading: false,
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.LOGIN:
            return login(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);
        default:
            return state;
    }
};

export default reducer;