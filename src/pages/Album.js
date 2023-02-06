import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    nameAlbum: '',
    musicList: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const musics = await getMusics(params.id);
    this.setState({
      musicList: musics.filter((music, index) => index !== 0),
      artistName: musics[0].artistName,
      nameAlbum: musics[0].collectionName,
    });
  }

  render() {
    const { musicList, artistName, nameAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div data-testid="artist-name">
            {artistName}
          </div>
          <div data-testid="album-name">
            {nameAlbum}
          </div>
        </section>
        <section>
          {
            musicList.map((music, index) => (
              <div key={ index }>
                <MusicCard
                  name={ music.artistName }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
