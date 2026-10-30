import {ADD_TO_LIST, DELETE_FROM_LIST} from "../actions/customOrderAction";

let initialStore = {
    id:0,
    cart: [],
}


const customOrderReducer = (state = initialStore, action) => {
    switch (action.type) {

        case ADD_TO_LIST: {
            let id = state.id +1
            let itemName = action.payload.itemName
            let quantity = action.payload.quantity

            let temCart ={
                id,
                itemName,
                quantity,
            }


            return {...state,id,
                cart: [...state.cart, temCart],
            }
        }
        case DELETE_FROM_LIST: {
            let tempCart = state.cart.filter(cartItem => cartItem.id !== action.payload.id)
            return {...state,
                cart: tempCart,
            }
        }

        default:
            return state;
    }
}
export default customOrderReducer;