import * as actionTypes from './actionTypes';

export const setClientGoal = goal => {
    return {
        type: actionTypes.SET_CLIENT_GOAL,
        payload: {
            goal: goal
        }
    };
};

export const setClientData = data => {
    return {
        type: actionTypes.SET_CLIENT_DATA,
        payload: {
            data: data
        }
    };
};

export const setClientSocket = socket => {
    return {
        type: actionTypes.SET_CLIENT_SOCKET,
        payload: {
            socket: socket
        }
    };
};