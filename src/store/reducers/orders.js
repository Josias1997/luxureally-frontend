import * as actionTypes from './../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    totalPrice: 0,
};

const startPlacingOrder = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const placingOrderSucceed = (state, action) => {
    const updateOrders = [...state.orders];
    updateOrders.push(action.payload.order);
    return {
        ...state,
        orders: updateOrders,
        loading: false,
        error: null,
        totalPrice: updateOrders.reduce((acc, order) => acc + order.total_price, 0)
    };
};

const placingOrderFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.payload.error
    };
};

const setOrders = (state, action) => {
    return {
        ...state,
        orders: action.payload.orders,
        loading: false,
        error: null,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type)  {
        case actionTypes.START_PLACING_ORDER:
            return startPlacingOrder(state, action);
        case actionTypes.PLACING_ORDER_SUCCEED:
            return placingOrderSucceed(state, action);
        case actionTypes.PLACING_ORDER_FAILED:
            return placingOrderFailed(state, action);
        case actionTypes.SET_ORDERS:
            return setOrders(state, action);
        default:
            return state;
    }
};

export default reducer;