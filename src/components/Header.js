import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';
import logado from '../img/ouvindo-musica.png';

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
              className="link procurar"
              to="/search"
              data-testid="link-to-search"
            >
              🔎 Procurar

            </Link>
          </div>
          <div className="link-div-favorites">
            <Link
              className="link favoritar"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              ❤️ Favoritas

            </Link>
          </div>
          <div className="link-div-profile">
            <Link
              className="link perfil"
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
