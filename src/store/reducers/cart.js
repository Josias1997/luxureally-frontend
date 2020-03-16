import * as actionTypes from './../actions/actionTypes';

const initialState = {
    cart: [],
    foodToBeAddedToCart: {},
    totalQuantity: 0,
    totalPrice: 0
};

const addItemToCart = (state, action) => {
    const updateCart = [...state.cart];
    const index = updateCart.findIndex(item => item._id === action.payload.item._id);
    if (index !== - 1) {
        updateCart[index].quantity += 1;
    } else {
        updateCart.push({
            ...action.payload.item,
            quantity: 1
        })
    }
    return {
        ...state,
        cart: updateCart,
        totalQuantity: updateCart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: updateCart.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    }
};

const removeItemFromCart = (state, action) => {
    const updateCart = [...state.cart];
    const index = updateCart.findIndex(item => item._id === action.payload._id);
    if (index !== - 1) {
        updateCart.splice(index, 1);
    }
    return {
        ...state,
        cart: updateCart,
        totalQuantity: updateCart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: updateCart.reduce((acc, item) => acc + (item.quantity * item.price), 0) 
    }
}

const updateCartItemQuantity = (state, action) => {
    const updateCart = [...state.cart];
    const index = updateCart.findIndex(item => item._id === action.payload._id);
    if (index !== -1) {
        updateCart[index].quantity = action.payload.quantity
    }
    return {
        ...state,
        cart: updateCart,
        totalQuantity: updateCart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: updateCart.reduce((acc, item) => acc + (item.quantity * item.price), 0) 
    }
};


const updateFoodToBeAddedToCart = (state, action) => {
    return {
        ...state,
        foodToBeAddedToCart: action.payload.food,
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM_TO_CART:
            return addItemToCart(state, action);
        case actionTypes.REMOVE_ITEM_FROM_CART:
            return removeItemFromCart(state, action);
        case actionTypes.UPDATE_CART_ITEM_QUANTITY:
            return updateCartItemQuantity(state, action);
        case actionTypes.UPDATE_FOOD_TO_BE_ADDED_TO_CART:
            return updateFoodToBeAddedToCart(state, action);
        default:
            return state;
    }
};

export default reducer;