import { GET_WALLET } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_WALLET:
    return {
      ...state,
      wallet: {
        currencies: action.payload,
        expenses: action.payload,
      },

    };
  default:
    return state;
  }
};

export default walletReducer;
