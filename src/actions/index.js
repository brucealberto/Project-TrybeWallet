// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  payload: expenses,
});

export function fetchMoedasApi(obj) {
  // try {
  //   const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const data = await resolve.json();
  //   return {

  //   }
  //   dispatch(getCurrencies(data));
  // } catch (error) {
  //   console.error(error);
  // }
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const object = { ...obj, exchangeRates: data };
      return dispatch(getExpenses(object));
    });
}
