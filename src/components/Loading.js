import React, { Component } from 'react';
import '../styles/Loading.css';
import logoInicial from '../img/musica-chorando.png';

class Loading extends Component {
  render() {
    return (
      <div className="div-loading">
        <img
          className="logo-carregando"
          src={ logoInicial }
          alt="logo-music"
        />
        <h2 className="h2-loading">Carregando...</h2>
        <img
          className="logo-carregando"
          src={ logoInicial }
          alt="logo-music"
        />
      </div>
    );
  }
}

export default Loading;
