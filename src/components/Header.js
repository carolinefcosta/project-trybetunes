import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';
import logado from '../img/logado.png';

class Header extends Component {
  state = {
    user: '',
    isLoading: true,
  };

  async componentDidMount() {
    const response = await getUser();
    this.setState({
      user: response,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header
        className="header"
        data-testid="header-component"
      >
        <div className="div-header">
          <img
            className="img-header"
            src={ logado }
            alt="imagem perfil logado"
          />
          <p data-testid="header-user-name">{user.name}</p>
        </div>
        <section className="section-header">
          <div className="link-div-search">
            <Link
              className="link"
              to="/search"
              data-testid="link-to-search"
            >
              🔎 Procurar

            </Link>
          </div>
          <div className="link-div-favorites">
            <Link
              className="link"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              🎶 Favoritas

            </Link>
          </div>
          <div className="link-div-profile">
            <Link
              className="link"
              to="/profile"
              data-testid="link-to-profile"
            >
              👤 Perfil

            </Link>
          </div>
        </section>
      </header>
    );
  }
}

export default Header;
