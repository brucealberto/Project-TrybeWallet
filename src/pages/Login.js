import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';

const MIN_NUMBER = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      // password: '',
      isDisabled: true,
    };
  }

  // handleSubmit = (event) => {
  //   event.prevent.default();
  // };

  handleInputEmail = ({ target }) => {
    this.setState({
      email: target.value,
    });
  };

  handleValidation = ({ target }) => {
    const { email } = this.state;
    const { value: { length } } = target;
    const validationRegex = /\S+@\S+\.\S+/; // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const result = validationRegex.test(email);
    if (result && length >= MIN_NUMBER) {
      this.setState({ isDisabled: false });
    }
  };

  handleSubmitRedux = () => {
    // event.prevent.default();
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('/carteira');
  }

  render() {
    // const { sendEmail } = this.props;
    const { isDisabled } = this.state;
    return (
      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Insira seu Email"
          onChange={ this.handleInputEmail }
          data-testid="email-input"
        />
        <input
          type="password"
          id="pass"
          name="pass"
          placeholder="Insira sua senha"
          onChange={ this.handleValidation }
          data-testid="password-input"
        />
        <button type="submit" disabled={ isDisabled } onClick={ this.handleSubmitRedux }>
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  sendEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
