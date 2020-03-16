import * as actionTypes from './actionTypes';

export const addItemToCart = item => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        payload: {
            item: item
        }
    }
};

export const removeItemFromCart = _id => {
    return {
        type: actionTypes.REMOVE_ITEM_FROM_CART,
        payload: {
            _id: _id
        }
    }
};

export const updateCartItemQuantity = (_id, quantity) => {
    return {
        type: actionTypes.UPDATE_CART_ITEM_QUANTITY,
        payload: {
            _id: _id,
            quantity: quantity
        }
    }
};

export const updateFoodToBeAddedToCart = food => {
    return {
        type: actionTypes.UPDATE_FOOD_TO_BE_ADDED_TO_CART,
        payload: {
            food: food
        }
    }
};