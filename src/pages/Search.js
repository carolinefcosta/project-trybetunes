import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <form>

          <label htmlFor="search-artist-input">
            <input
              id="search-artist-input"
              data-testid="search-artist-input"
            />
          </label>
        </form>
      </>
    );
  }
}

export default Search;
