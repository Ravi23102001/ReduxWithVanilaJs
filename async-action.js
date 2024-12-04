const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').thunk;
const axios = require('axios')
const reduxLogger=require('redux-logger');
const logger=reduxLogger.createLogger();

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

//Initial state
const initialState = {
    loading: true,
    product: [],
    error: false
}

//Action creators

function fetchRequest() {
    return {
        type: FETCH_REQUEST
    }
}

function fetchSuccess(product) {
    return {
        type: FETCH_SUCCESS,
        payload: product
    }
}

function fetchError() {
    return {
        type: FETCH_ERROR
    }
}

//Reducer

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }

        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        default:
            return state
    }
}

//thunk action creator return function, that function is not pure function,because it's performing side effect
const fetchProduct = () => {
    return (dispatch) => {   //redux thunk automaticaly inject dispatch as a arguement
        dispatch(fetchRequest())
        axios.get('https://fakestoreapi.com/products')
            .then(
                res =>{
                    const product=res.data.map((product)=>product.title)
                    dispatch(fetchSuccess(product))
                }
            )
            .catch(error => {
                dispatch(fetchError())
            })

    }
}
//Store
const store = createStore(reducer, applyMiddleware(thunk,logger))
// store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchProduct())
