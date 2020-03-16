import * as actionTypes from './../actions/actionTypes';

const initialState = {
    socket: null,
    goal: null,
    data: null
};

const setGoal = (state, action) => {
    return {
        ...state,
        goal: action.payload.goal
    };
};

const setData = (state, action) => {
    return {
        ...state,
        data: action.payload.data
    }
};

const setSocket = (state, action) => {
    return {
        ...state,
        socket: action.payload.socket
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CLIENT_GOAL:
            return setGoal(state, action);
        case actionTypes.SET_CLIENT_DATA:
            return setData(state, action);
        case actionTypes.SET_CLIENT_SOCKET:
            return setSocket(state, action);
        default:
            return state;
    }
};

export default reducer;