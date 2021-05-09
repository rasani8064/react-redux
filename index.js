const { createStore, combineReducers, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

//step1: for creating initialState

const initialLaptopState={
    numofLaptops:100
}

const initialMobileState={
    numofMobiles:1000
}

//step2: for creating ACtions with types
const buyLaptop=()=>{
    return {
        type:"BUY_LAPTOP"
    }
}

const buyMobile=()=>{
    return{
        type:"BUY_MOBILE"
    }
}

//step3 Creating Reducers

const laptopReducer = (state=initialLaptopState, action)=>{
    switch(action.type){
        case "BUY_LAPTOP":
            return {numofLaptops:state.numofLaptops-1};
        default:
            return state;
    }
}
const mobileReducer = (state=initialMobileState, action)=>{
    switch(action.type){
        case "BUY_MOBILE":
            return {numofMobiles:state.numofMobiles-1};
        default:
            return state;
    }
}

//step4 for creating Stores
const rootstore = combineReducers({laptopReducer,mobileReducer})
const store = createStore(rootstore, applyMiddleware(logger)) 

// console.log(store);
store.subscribe(()=> console.log(store.getState()))
store.dispatch(buyLaptop())
store.dispatch(buyMobile())