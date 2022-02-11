import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMoedasApi, getExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      ratesOption: [],
    };
  }

  async componentDidMount() {
    await this.getRates();
    // await this.handleAllRates();
  }

  getRates = async () => {
    const getApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await getApi.json();
    const arrayRates = Object.keys(data);
    const filterUSDT = arrayRates.filter((rate) => rate !== 'USDT');
    this.setState({
      ratesOption: filterUSDT,
    });
  };

  // handleAllRates = async () => {
  //   const getApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const data = await getApi.json();
  //   this.setState({
  //     allExpenses: data,
  //   });
  // };

  getTotal = () => {
    const { readExpenses } = this.props;
    if (readExpenses.length > 0) {
      // const { currency, exchangeRates, value } = readExpenses;
      // const cotacao = exchangeRates[currency].ask;
      // const valorTotal = cotacao * value;
      let total = 0;
      readExpenses.forEach((expense) => {
        const { currency, exchangeRates, value } = expense;
        const cotacao = exchangeRates[currency].ask;
        const valorTotal = cotacao * value;
        total += valorTotal;
      });
      return total.toFixed(2);
    }
    return 0;
  };

  handleChangeInputs = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { readExpenses, sendToFetchApi } = this.props;
    const { value, currency, method, tag, description } = this.state;
    // sendExpenses({ ...this.state, id: readExpenses.length });
    sendToFetchApi({
      value,
      currency,
      method,
      tag,
      description,
      id: readExpenses.length,
    });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  };

  render() {
    const { userLogin } = this.props;
    const { value, description, currency, method, tag, ratesOption } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">
            Usuário:
            {userLogin}
          </h2>
          <span>
            <span data-testid="total-field">{this.getTotal()}</span>
          </span>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form>
          <label htmlFor="value">
            <input
              id="value"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChangeInputs }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              id="description"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChangeInputs }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChangeInputs }
            >
              {ratesOption.map((rate) => (
                <option key={ rate } data-testid={ rate }>
                  {rate}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChangeInputs }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChangeInputs }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  readExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpenses: (expenses) => dispatch(getExpenses(expenses)),
  sendToFetchApi: (obj) => dispatch(fetchMoedasApi(obj)),
});

Wallet.propTypes = {
  userLogin: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
