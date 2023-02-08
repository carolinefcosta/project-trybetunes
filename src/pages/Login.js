import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';
// import logoInicial from '../img/musica-chorando.png';
import logo from '../img/ouvindo-musica.png';

class Login extends Component {
  state = {
    name: '',
    isLoading: false,
    disabledButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      if (this.verifyButton()) {
        this.setState({
          disabledButton: false,
        });
      } else {
        this.setState({
          disabledButton: true,
        });
      }
    });
  };

  verifyButton = () => {
    const minLength = 3;
    const { name } = this.state;
    return (name.length >= minLength);
  };

  verifyCreateUser = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });

    await createUser({ name });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { name, disabledButton, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="body">
        <form className="form">
          <div data-testid="page-login">
            <div className="trybe-logo">
              <h1 className="h1">Trybe</h1>
              <img
                className="logo-music"
                src={ logo }
                alt="logo-music"
              />
              <h1 className="tunes h1">Tunes</h1>
            </div>
            <label htmlFor="login-name-input">
              <input
                className="login-name-input"
                id="login-name-input"
                type="text"
                name="name"
                data-testid="login-name-input"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="login-submit-button"
              type="button"
              onClick={ this.verifyCreateUser }
              disabled={ disabledButton }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
