const redux=require('redux');
const createStore=redux.createStore;

const ORDER_PIZZA='ORDER_PIZZA';

//Action is a plain javascript object

const action={
    type: ORDER_PIZZA,
    shop_name:'pizza-shop' 
}

//Action creator is a function, it will be return action

function orderPizza(){
    return {
        type:ORDER_PIZZA,
        shop_name:'pizza-shop'
    }
}

//Reducer

const initialState={
    pizzaBase:100
}

const reducer=(state=initialState, action)=>{
switch (action.type) {
    case ORDER_PIZZA:
        return{
            ...state,
            pizzaBase:state.pizzaBase-1
        }
    default:
        return state
}
}

//Store
// 1) store need to hold entire application state
//createstore hold reducer function because reducer function already hold application initialstate

const store=createStore(reducer)

//2) It exposes a method called getstate() using this getstate we can easily get access to our current state

console.log(store.getState(),'initialstate')

//3) Register listeners via subscribe (listener)

const unSubscribe=store.subscribe(()=>console.log('updated state', store.getState()))

//4) Allow the state to update via dispatch(action)

store.dispatch(orderPizza())
store.dispatch(orderPizza())
store.dispatch(orderPizza())

//5 Handles unregistering of listeners via the function returned by subscribe
unSubscribe()
store.dispatch(orderPizza()) //once we have unsubscribe the store, we will not access the store

