import {SET_HOME_CATEGORIES, SET_MENU_CATEGORIES} from "../actions/menuActions";

let initialStore = {
    menuCategories: [],
    homeCategories: []
}


const menuReducer = (state = initialStore, action) => {
    switch (action.type) {
        case SET_MENU_CATEGORIES:

            return {
                ...state,
                menuCategories: action.payload.menu_categories
            };

        case SET_HOME_CATEGORIES:

            return {
                ...state,
                homeCategories: action.payload.home_categories
            }

        default :
            return state;

    }
}
export default menuReducer;