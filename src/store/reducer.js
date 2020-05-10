import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    meat: 0,
    salad: 0,
    cheese: 0,
    bacon: 0
  },
  totalPrice: 0
};

const INGREDIENT_PRICES = {
  meat: 20,
  bacon: 10,
  cheese: 7.5,
  salad: 5
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    default:
      return state;
  }
}

export default reducer;