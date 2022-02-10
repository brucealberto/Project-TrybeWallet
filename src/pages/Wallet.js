import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userLogin } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">
            Usuário:
            {userLogin}
          </h2>
          <ul data-testid="total-field">
            Despesa Total
            <li>0</li>
          </ul>
          <p data-testid="header-currency-field">BRL</p>

        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
});

Wallet.propTypes = {
  userLogin: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
