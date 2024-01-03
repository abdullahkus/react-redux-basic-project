import { useReducer, useEffect } from 'react';

const actions = {
    FETCH_INIT: 'FETCH_INIT',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE',
};

const fetchReducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_INIT:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case actions.FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const initialState = {
    data: null,
    loading: true,
    error: null,
};

export const useFetch = (fetchFunction, dependencies = []) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: actions.FETCH_INIT });
            try {
                const result = await fetchFunction();
                dispatch({ type: actions.FETCH_SUCCESS, payload: result.data });
            } catch (error) {
                dispatch({ type: actions.FETCH_FAILURE, payload: error });
            }
        };

        fetchData();
    }, [...dependencies]);

    return state;
};
