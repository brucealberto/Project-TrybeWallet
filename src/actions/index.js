// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const GET_WALLET = 'GET_WALLET';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

// export const getWallet = (payload) => ({
//   type: GET_WALLET,
//   payload,
// });
