import * as actionTypes from './../actions/actionTypes';

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const startFetchingCategories = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const fetchingCategoriesSucceed = (state, action) => {
    return {
        ...state,
        categories: action.payload.categories,
        loading: false,
        error: null
    };
};

const fetchingCategoriesFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.payload.error
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type)  {
        case actionTypes.START_FETCHING_CATEGORIES:
            return startFetchingCategories(state, action);
        case actionTypes.FETCHING_CATEGORIES_SUCCEED:
            return fetchingCategoriesSucceed(state, action);
        case actionTypes.FETCHING_CATEGORIES_FAILED:
            return fetchingCategoriesFailed(state, action);
        default:
            return state;
    }
};

export default reducer;