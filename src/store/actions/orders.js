import * as actionTypes from './actionTypes';
import axios from './../../instanceAxios';

export const startPlacingOrder = () => {
    return {
        type: actionTypes.START_PLACING_ORDER
    };
};

export const placingOrderSucceed = (order) => {
    return {
        type: actionTypes.PLACING_ORDER_SUCCEED,
        payload: {
            order: order
        }
    };
};

export const setOrders = orders => {
    return {
        type: actionTypes.SET_ORDERS,
        payload: {
            orders: orders
        }
    }
};


export const placingOrderFailed = (error) => {
    return {
        type: actionTypes.PLACING_ORDER_FAILED,
        payload: {
            error: error
        }
    };
};


export const placeOrder = (type, data, socket) => {
    return dispatch => {
        dispatch(startPlacingOrder());
        axios.post(type === 'delivery' ? '/api/deliveries/' : '/api/orders/' , {
            ...data
        }).then(({data}) => {
                dispatch(placingOrderSucceed(data));
                if(type === 'delivery') {
                    socket.emit('newDelivery', data);
                } else {
                    console.log(data);
                    socket.emit('newOrder', data);
                }
            }).catch(error => {
                console.log(error);
                dispatch(placingOrderFailed(error));
        })
    };
};