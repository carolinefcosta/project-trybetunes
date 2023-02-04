import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    isLoading: true,
  };

  async componentDidMount() {
    const response = await getUser();
    this.setState({
      isLoading: false,
      user: response,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    console.log(this.props);
    return (
      <header
        user="user"
        value={ user }
        data-testid="header-component"
      >
        { isLoading ? <Loading /> : user.name }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
