import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends Component {
  state = {
    myfavorites: [],
  };

  async componentDidMount() {
    this.setState({
      myfavorites: await getFavoriteSongs(),
    });
  }

  render() {
    const { myfavorites } = this.state;
    console.log(myfavorites);
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="div-main-favorites">
          <h1 className="h1-favorites">Minhas Músicas Favoritas</h1>
          {
            myfavorites.map((musicFav, index) => (
              <div key={ index } className="div-pai-favorite-music">
                <h2 className="h2-favorite-music">
                  {musicFav.trackName}
                </h2>
                <audio
                  data-testid="audio-component"
                  src={ musicFav.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
