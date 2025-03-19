const { produce } = require("immer")
const { createStore } = require("redux")

const AGECHANGE ='AGE_CHANGE'
const initialState={
    name:"ravi",
    data:{
        age:22,
        height:5.2,
        weight:54,
        color:'balck and white'
       }
}

const ageChange=(age)=>{
    return{
        type:AGECHANGE,
        payload:age
    }
}

const personReducer=(state=initialState, action)=>{
switch (action.type) {
    case 'AGE_CHANGE':
    // return{
    //     ...state,
    //     data:{
    //         ...state.data,
    //         age:action.payload
    //     }
    // }

    return produce(state,draft=>{
        draft.data.age=action.payload
    })

    default:
       return state
}
}
const store = createStore(personReducer)


console.log(store.getState())
store.dispatch(ageChange(50))
console.log(store.getState())