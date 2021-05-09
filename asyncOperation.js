const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const { default: thunk } = require("redux-thunk");

const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
const FETCH_REQUEST_FAIL = "FETCH_REQUEST_FAIL";
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";

//step1: for creating initialState

const initialState = {
  users: [],
  error: "",
  isLoading: false,
};

//step2: for creating ACtions with types

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchRequestSuccess = (users) => {
  return {
    type: FETCH_REQUEST_SUCCESS,
    data: users,
  };
};
const fetchRequestFail = (error) => {
  return {
    type: FETCH_REQUEST_FAIL,
    data: error,
  };
};
//step3 Creating Reducers

const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_REQUEST_SUCCESS:
      return { isLoading: false, users: action.data, error: "" };
    case FETCH_REQUEST_FAIL:
      return { isLoading: false, users: [], error: action.data };

    default:
      return state;
  }
};

//fetching Users
const fetchUsers =() =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            let users = response.data.map(user => user.name)
            dispatch(fetchRequestSuccess(users))
        })
        .catch(error =>{
            dispatch(fetchRequestFail(error))
        })
    }
}

//step4 for creating Stores
const store = createStore(fetchUsersReducer, applyMiddleware(thunk));

// console.log(store);
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
