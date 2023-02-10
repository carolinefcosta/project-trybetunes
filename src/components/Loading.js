import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="div-loading">
        <h2 className="h2-loading">Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
