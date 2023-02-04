import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
    disabledButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verifyButton();
    });
  };

  verifyButton = () => {
    const minLength = 2;
    const { artistName } = this.state;
    if (artistName.length >= minLength) {
      this.setState({
        disabledButton: false,
      });
    }
  };

  render() {
    const { artistName, disabledButton } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <form>

          <label htmlFor="search-artist-input">
            <input
              value={ artistName }
              name="artistName"
              type="text"
              id="search-artist-input"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledButton }
          >
            Pesquisar

          </button>
        </form>
      </>
    );
  }
}

export default Search;
