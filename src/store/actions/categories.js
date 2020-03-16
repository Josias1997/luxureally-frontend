import * as actionTypes from './actionTypes';
import axios from './../../instanceAxios';

export const startFetchingCategories = () => {
    return {
        type: actionTypes.START_FETCHING_CATEGORIES
    };
};

export const fetchingCategoriesSucceed = (categories) => {
    return {
        type: actionTypes.FETCHING_CATEGORIES_SUCCEED,
        payload: {
            categories: categories
        }
    };
};


export const fetchingCategoriesFailed = (error) => {
    return {
        type: actionTypes.FETCHING_CATEGORIES_FAILED,
        payload: {
            error: error
        }
    };
};


export const fetchCategories = (restaurantId) => {
    return dispatch => {
        dispatch(startFetchingCategories());
        axios.get(`/api/categories/restaurant/${restaurantId}`)
            .then(({data}) => {
                dispatch(fetchingCategoriesSucceed(data));
            }).catch(error => {
                dispatch(fetchingCategoriesFailed(error));
            })
    }
};